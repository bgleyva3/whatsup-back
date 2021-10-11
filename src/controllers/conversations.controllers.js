const ConversationsService = require("../services/conversations.service")


const getAllConversations = async (req, res, next) => {
    try{
        const users = await ConversationsService.getAll()
        res.json(users)
    }catch(err){
        next(err)
    }
}

const getConversationById = async (req, res, next) => {
    try{
        const {id} = req.params
        const user = await ConversationsService.getById(id)
        res.json(user)
    }catch(err){
        next(err)
    }
}

const createConversation = async (req, res, next) => {
    try{
        const {title, image_url, type, created_by} = req.body
        
        const newConversation = {
            title, 
            image_url: image_url || null,
            type,
            created_by
        }
        
        const conversation = await ConversationsService.create(newConversation)
        res.status(201).json(conversation)
    }catch(err){
        next(err)
    }
}

const updateConversation = async (req, res, next) => {
    try{
        const user = await ConversationsService.update(req.body, req.params.id)
        res.json(user)
    }catch(err){
        next(err)
    }
}

const deleteConversation = async (req, res, next) => {
    try{
        const {id} = req.params
        const user = await ConversationsService.delete(id)
        res.json(user)
    }catch(err){
        next(err)
    }
}



const conversationUsers = async (req, res, next) => {
    try {
        const {id} = req.params
        const result = await ConversationsService.joinUsers(id)
        res.json(result)
    } catch(err) {
        next(err)
    }
}

const conversationParticipants = async (req, res, next) => {
    try {
        const {id} = req.params
        const result = await ConversationsService.joinParticipants(id)
        res.json(result)
    } catch(err) {
        next(err)
    }
}

const conversationMessages = async (req, res, next) => {
    try {
        const {id} = req.params
        const result = await ConversationsService.joinMessages(id)
        res.json(result)
    } catch(err) {
        next(err)
    }
}

const postMessage = async (req, res, next) => {
    try{
        //renombramos req.user.id como sender_id
        //obtenemos req.user del middleware de auth.middleware
        const {id: sender_id} = req.user;
        const {id: conversation_id} = req.params;
        const {message} = req.body

        let result = await ConversationsService.sendMessage(sender_id, conversation_id, message)
        res.status(201).json(result)
    }catch(err){
        next(err)
    }
}


module.exports = {
    getAll: getAllConversations,
    getById: getConversationById,
    create: createConversation,
    update: updateConversation,
    delete: deleteConversation,
    conversationUsers,
    conversationParticipants,
    conversationMessages,
    postMessage
}