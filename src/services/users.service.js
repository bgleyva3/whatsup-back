// {component} siempre llama primero al index, y el index tiene las
// reglas para importarlo/exportarlo.
const {conversations, users, participants, messages} = require("../models")

//const users = require("../models/users")


class UserService{
    static async getAll(){
        try{
            let results = await users.findAll({
                attributes: {
                    exclude: ["password"]
                }
            })
            return results
        }catch(err){
            throw err
        }
    }

    static async getById(id){
        try{
            let result = await users.findByPk(id, {
                attributes: {
                    exclude: ["password"]
                }
            })
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
            result = JSON.parse(JSON.stringify(result))
            delete result.password
            return result
        }catch(err){
            throw err
        }
    }

    static async update(updateUser, id){
        try{
            let result = await users.update(updateUser, {where: {id}})
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


    static async joinConversations(id){
        try{
            let result = await users.findOne({
                where: {id},
                attributes: ["id", "firstname", "lastname", "email"],
                include: [
                    {
                        model: participants,
                        as: "participants",
                        attributes: ["conversation_id"],
                        include: [
                            {
                                model: conversations,
                                as: "conversation",
                                attributes: ["id", "title", "image_url", "type"]
                            }
                        ]
                    }
                ]
            })
            return result
        }catch(err){
            throw err
        }
    }
}

module.exports = UserService