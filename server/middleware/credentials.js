import whitelist from "../config/whitelist.js";


const credentials = (req, res, next) => {
    const origin = req.params.origin;
    if(whitelist.includes(origin)){
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}


export default credentials;