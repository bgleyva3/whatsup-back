const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const bearerToken = req.headers.authorization
    if(bearerToken){
        const token = bearerToken.split("Bearer ")[1]
        try{
            //decoded no devuelve ningún true. Basta con que jwt.verify
            //devuelva cualquier usuario para considerarse como token exitoso
            const decoded = jwt.verify(token, "academlocat21")
            //creamos una nueva propiedad "user" en req cada vez que el usuario ->
            //realice alguna consulta con una ruta protegida por validateToken
            req.user = decoded
            return next()
        }catch(err){
            return next(err)
        }
    }
    const tokenError = new Error("No se proporcionó el token");
    tokenError.name = "JsonWebTokenError";
    return next(tokenError);
}

const restrictedPermission = (req, res, next) => {
    //req.user viene de la línea 11 después de ser decodificado
    const {id: userId} = req.user //usuario loggeado
    const {id: paramId} = req.params //id del endpoint
    if(userId !== Number(paramId)){
        const error = new Error("No tienes permiso para realizar esa operación")
        error.name = "insufficientPermissions"
        return next(error)
    }
    return next()
}


module.exports = {
    validateToken,
    restrictedPermission
}



/* const jwt = require("jsonwebtoken")

const validateToken = (req, res, next) => {
    //Validar que el token sea correcto
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
    const tokenError = new Error("No se proporcionó el token");
    tokenError.name = "JsonWebTokenError";
    return next(tokenError);
}

module.exports = {validateToken} */