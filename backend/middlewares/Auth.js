const jwt = require("jsonwebtoken")

const ensureAuthentication = (req, res, next) =>{
    const auth = req.headers['authorisation'];
    if(!auth){
        return res.status(403)
        .json({message:"Json web token is required"});

    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        res.user = decoded;
        next();

    } catch (error) {
        return res.status(401)
        .json({message:"JWT Token wrong or expired"})
    }
}

module.exports = ensureAuthentication;