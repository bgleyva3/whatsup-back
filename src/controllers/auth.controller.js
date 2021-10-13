const AuthService = require("../services/auth.service");

const authenticate = async(req, res, next) => {
    try{
    const {email, password} = req.body;
    const {token, user} = await AuthService.login(email, password);
    
    return res.json({
        accessToken: token,
        user: {
            ...user,
            roles: ["ROLE_ADMIN"]
        }
    });
    }catch(error){
        next(error);
    }
}

module.exports = {
    authenticate
}



/* const AuthService = require("../services/auth.service")

const authenticate = async (req, res, next) => {
    try{
        const {email, password} = req.body
        const result = await AuthService.login(email, password)
        console.log("+++++++++++++++++++++++++++++++++")
        console.log(result)
        console.log("+++++++++++++++++++++++++++++++++")
        if(result.valid){
            let user = {
                id: result.id,
                firstname: result.firstname,
                lastname: result.lastname,
                email: result.email
            }
            const token = AuthService.getToken(user)
            return res.json({
                message: "Has iniciado sesión",
                token
            })
        }
        res.json({
            message: "Las credendiales son incorrectas"
        })
    }catch(err){
        next(err)
    }
}

module.exports = {
    authenticate
} */