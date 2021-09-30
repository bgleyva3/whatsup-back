const {users} = require("../models")


class UserService{
    static async getAll(){
        try{
            console.log(users)
            let results = await users.findAll()
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
            let result = await users.create(newUser)
            return result
        }catch(err){
            throw err
        }
    }

    static async update(updateUser, id){
        try{
            let result = await users.update(updateUser, {where: {id}})
            return result
        }catch(err){
            throw err
        }
    }

    static async delete(id){
        try{
            let result = await users.destroy({where: {id}})
            if(result === 1)
                return `Se eliminó el usuario con el id ${id} de la base de datos`
            return `No existe un usuario con id ${id} en la base de datos`
        }catch(err){
            throw err
        }
    }
}

module.exports = UserService