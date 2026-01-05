import pool from '../db/db.js';



const handleLogout = async (req, res) => {
    // On client delete accessToken

    const client = await pool.connect();
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204); // Sucessful No content to sendback

        const refreshToken = cookies.jwt;

        const userTokens = await client.query('SELECT * FROM tokens WHERE refresh_token = $1', [refreshToken]);
        if (userTokens.rows.length === 0) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
            return res.status(204);
        } 
        const tokenResult = userTokens.rows[0];

        await client.query("BEGIN");

        const deletedToken = await client.query('UPDATE tokens SET access_token = $1, refresh_token = $2 WHERE user_id = $3', [0,0,tokenResult.user_id])
        
        if(deletedToken.rowCount === 0){
            return res.status(401).json({ Error: 'User was not logged out' });
        }

        await client.query("COMMIT");

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // Add secure: true only serves on https we are on http for dev rn
        res.sendStatus(204);

    } catch (err) {
        await client.query("ROLLBACK");
        console.log(err.message);
        return res.status(500).json({Error: 'Server error'});
    }
    
}

export {handleLogout};