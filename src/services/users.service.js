// {component} siempre llama primero al index, y el index tiene las
// reglas para importarlo/exportarlo.
const {users} = require("../models")

//const users = require("../models/users")


class UserService{
    static async getAll(){
        try{
            let results = await users.findAll()
            /* console.log("''''''''''''''''''''''''''")
            console.log(results)
            console.log("''''''''''''''''''''''''''") */
            return results
        }catch(err){
            throw err
        }
    }

    static async getById(id){
        try{
            let result = await users.findByPk(id)
            if(result)
                return result
            return {}
        }catch(err){
            throw err
        }
    }

    static async create(newUser){
        try{
            console.log("------------------newUser------------------")
            console.log(newUser)
            console.log("------------------------------------------")
            let result = await users.create(newUser)
            console.log("-------------create service---------------")
            console.log(result)
            console.log("------------------------------------------")
            return result
        }catch(err){
            throw err
        }
    }

    static async update(updateUser, id){
        try{
            /* console.log("++++++++++++++update Service+++++++++++++++")
            console.log(updateUser)
            console.log("+++++++++++++++++++++++++++++++++++++++++++") */
            let result = await users.update(updateUser, {where: {id}})
            /* console.log("++++++++++++++update Result++++++++++++++++")
            console.log(result)
            console.log("+++++++++++++++++++++++++++++++++++++++++++") */
            if(result[0] === 1)
                return true
            return false
        }catch(err){
            throw err
        }
    }

    static async delete(id){
        try{
            let result = await users.destroy({where: {id}})
            return result
        }catch(err){
            throw err
        }
    }
}

module.exports = UserService