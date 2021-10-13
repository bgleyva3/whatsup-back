/* const {users} = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

class AuthService{

    static async login(email, password){
        try{
            let result = await users.findOne({where: {email}})
            //Comparar la contraseña de la DB -> contraseña del cliente
            const valid = bcrypt.compareSync(password, result.password)
            result = JSON.parse(JSON.stringify(result))
            if(valid) 
                return {
                    valid: true,
                    ...result
                }
            return {
                valid: false
            }
        }catch(err){
            throw err
        }
    }

    static getToken(user){
        try{
            const token = jwt.sign(user, 'academlocat21', {
                expiresIn: "2h",
                algorithm: "HS256"
            })
            return token
        }catch(err){
            throw err
        }
    }

}

module.exports = AuthService */



const { users } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

class AuthService {
    static async login(email, password) {
    try {
        let result = await users.findOne({where: {email}});
        
        const error = new Error("Las credenciales son incorrectas");
        error.name = "InvalidCredentials";

      //Si el usuario no existe 
        if(!result)
            throw error;
      //Comparar la contraseña de la DB -> contraseña que me envía el cliente
        const valid = bcrypt.compareSync(password, result.password);
        result = JSON.parse(JSON.stringify(result));

      // si la contraseña es incorrecta
        if(!valid)
            throw error;
        const token = this.genToken(result);
        return {
            token, 
            user: result
        };
    } catch (error) {
        throw error;
    }
    }

    static genToken(user){
    try {
        const token = jwt.sign(user, 'academlocat21', {
            expiresIn: "2h",
            algorithm: 'HS256'
        });
        return token;
    } catch (error) {
        throw error;
    }
    }
}

module.exports = AuthService;