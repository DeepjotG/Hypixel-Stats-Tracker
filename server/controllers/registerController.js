import pool from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const registerUser  = async (req, res) => {
    const client = await pool.connect();
    try {
        const { username, password } = req.body;
        const hashedPwd = await bcrypt.hash(password, 10); 

        await client.query("BEGIN");

        const newUser = await client.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id, username, admin', [username, hashedPwd]);
        const result = newUser.rows[0];


        const accessToken = jwt.sign(
            {"username": username, "admin": result.admin},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        );
        const refreshToken = jwt.sign(
            {"username": username, "admin": result.admin},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );

        const userUpdate = await client.query('INSERT INTO tokens (user_id, access_token, refresh_token) VALUES ($1, $2, $3)', 
            [result.user_id, accessToken, refreshToken]);
        
        if(userUpdate.rowCount === 0){
            return res.status(401).json({ Error: 'User token not found' });
        }

        await client.query("COMMIT");

        res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        res.json({accessToken});

        } catch (err) {

        await client.query("ROLLBACK");

        if(err.code == "23505"){
            return res.status(409).json({ Error: 'This user is already registered' });
        }

        console.log(err.message);
        res.status(500).json({'Error': err.message});
    }

}


export {registerUser};