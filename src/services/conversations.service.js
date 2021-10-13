const {conversations, users, participants, messages} = require("../models")


class ConversationsService{
    static async getAll(){
        try{
            let results = await conversations.findAll()
            return results
        }catch(err){
            throw err
        }
    }

    static async getById(id){
        try{
            let result = await conversations.findByPk(id)
            if(result)
                return result
            return {}
        }catch(err){
            throw err
        }
    }

    static async create(newConversation){
        try{
            let conversation = await conversations.create(newConversation)
            await participants.create({
                conversation_id: conversation.id, 
                user_id: conversation.created_by
            })
            return conversation
        }catch(err){
            throw err
        }
    }

    static async update(updatedConversation, id){
        try{
            let result = await conversations.update(updatedConversation, {where: {id}})
            if(result[0] === 1)
                return `Se actualizó la conversación con el id ${id} de la base de datos`
            return `No existe la conversación con el id ${id} en la base de datos`
        }catch(err){
            throw err
        }
    }

    static async delete(id){
        try{
            let result = await conversations.destroy({where: {id}})
            if(result === 1)
                return `Se eliminó la conversación con el id ${id} de la base de datos`
            return `No existe una conversación con id ${id} en la base de datos`
        }catch(err){
            throw err
        }
    }


    static async joinUsers(id){
        try{
            let result = await conversations.findOne({
                where: {id},
                include: [
                    {
                        model: users,
                        as: "created_by_user"
                    }
                ]
            })
            return result
        }catch(err){
            throw err
        }
    }

    static async joinParticipants(id){
        try{
            let result = await conversations.findAll({
                where: {id},
                attributes: {
                    exclude: ["created_at", "updated_at"]
                },
                include: [
                    {
                        model: participants,
                        as: "participants",
                        attributes: ["user_id"],
                        include: [
                            {
                                model: users,
                                as: "user",
                                attributes: {
                                    exclude: ["password", "created_at", "updated_at", "phone"]
                                }
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

    static async joinMessages(id){
        try{
            let result = await conversations.findOne({
                where: {id},
                attributes: {
                    exclude: ["created_at", "updated_at"]
                },
                include: [
                    {
                        model: messages,
                        as: "messages",
                        attributes: {
                            exclude: ["id", "sender_id", "conversation_id", "created_at"]
                        },
                        include: [
                            {
                                model: users,
                                as: "sender",
                                attributes: {
                                    exclude: ["password", "created_at", "updated_at", "phone"]
                                }
                            }
                        ]
                    }
                ],
                order: [["messages", "id", "asc"]]
            })
            return result
        }catch(err){
            throw err
        }
    }

    static async sendMessage(sender_id, conversation_id, message){

        const newMessage = {
            sender_id,
            conversation_id,
            message
        }

        try{
            let message = await messages.create(newMessage)
            return(message)
        }catch(err){
            throw err
        }
    }
}

module.exports = ConversationsService