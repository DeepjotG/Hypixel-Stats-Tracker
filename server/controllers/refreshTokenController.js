import pool from '../db/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const handleRefreshToken = async (req, res) => {

    const client = await pool.connect();
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(401);

        const refreshToken = cookies.jwt;

        const userTokens = await client.query('SELECT * FROM tokens WHERE refresh_token = $1', [refreshToken]);
        if (userTokens.rows.length === 0) {
            return res.status(401).json({ Error: 'User token not found' });
        } 
        const tokenResult = userTokens.rows[0];

        const user = await client.query('SELECT * FROM users WHERE user_id = $1', [tokenResult.user_id]);
        if (user.rows.length === 0) {
            return res.status(401).json({ Error: 'User not found' });
        } 
        const userResult = user.rows[0];

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err || userResult.username !== decoded.username) return res.sendStatus(403);
                const accessToken = jwt.sign(
                    { "username": decoded.username},
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '30s'}
                );
                await client.query("BEGIN");
                const userUpdate = await client.query('UPDATE tokens SET access_token = $1 WHERE user_id = $2', 
                    [accessToken, userResult.user_id]);
                
                if(userUpdate.rowCount === 0){
                    return res.status(401).json({ Error: 'User token not updated' });
                }

                await client.query("COMMIT");
                res.json({accessToken});
            }
        )

    } catch (err) {
        await client.query("ROLLBACK");
        console.log(err.message);
        return res.status(500).json({Error: 'Server error'});
    }
    
}

export {handleRefreshToken};