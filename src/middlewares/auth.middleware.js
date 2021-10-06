const jwt = require("jsonwebtoken")

const validateToken = (req, res, next) => {
    const bearerToken = req.headers.authorization
    if(bearerToken){
        const token = bearerToken.split("Bearer ")[1]
        try{
            const decoded = jwt.verify(token, "academlocat21")
            req.user = decoded
            next() //token valido
        }catch(err){
            next(err) //token invalido
        }
    }
}

module.exports = {validateToken}