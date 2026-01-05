import pool from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
 

function requiredFields(req, res, next) {
    const {username, password} = req.body;

    if(!username || !password) {
        return res.status(400).json({Error: 'Username and password are required'});
    }

    next();
}



const authUser = async (req, res) => {

    const client = await pool.connect();
    try {
        const {username, password} = req.body;

        const user = await client.query(
          "SELECT * FROM users WHERE username = $1",
          [username]
        );
        if (user.rows.length === 0) {
          return res.status(401).json({ Error: "User not found" });
        }
        const result = user.rows[0];
        const match = await bcrypt.compare(password, result.password);

        if (match) {
          const accessToken = jwt.sign(
            { username: username, admin: result.admin },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }
          );
          const refreshToken = jwt.sign(
            { username: username, admin: result.admin },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
          );

          await client.query("BEGIN");
          const userUpdate = await client.query(
            "UPDATE tokens SET access_token = $1, refresh_token = $2 WHERE user_id = $3",
            [accessToken, refreshToken, result.user_id]
          );

          if (userUpdate.rowCount === 0) {
            return res.status(401).json({ Error: "User token not updated" });
          }

          await client.query("COMMIT");
          res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.json({ accessToken });
        } else {
          res.sendStatus(401);
        }
    } catch (err) {
        await client.query("ROLLBACK");
        console.log(err.message);
        return res.status(500).json({Error: 'Server error'});
    }
    
}

export {authUser, requiredFields};
