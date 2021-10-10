const UserService = require("../services/users.service")

const getAllUsers = async (req, res, next) => {
    console.log("GET ALL USERS")
    try{
        const users = await UserService.getAll()
        next()
        res.json(users)
    }catch(err){
        next(err)
    }
}

const getUserById = async (req, res, next) => {
    try{
        const {id} = req.params
        const user = await UserService.getById(id)
        res.json(user)
    }catch(err){
        next(err)
    }
}

const createUser = async (req, res, next) => {
    try{
        const {firstname, lastname, email, password, profile_image, phone} = req.body
        
        const newUser = {
            firstname, 
            lastname,
            email,
            password,
            profile_image: profile_image || null,
            phone
        }
        
        const user = await UserService.create(newUser)

        /* console.log("****************************")
        console.log(user)
        console.log("****************************") */
        res.status(201).json(user)
    }catch(err){
        next(err)
    }
}

const updateUser = async(req, res, next) => {
    try{
        const {id} = req.params;
        const {firstname, lastname, email, password, profile_image, phone} = req.body;
    
        const updatedUser = {
            firstname,
            lastname,
            email,
            password,
            profile_image,
            phone
        }
    
        const user = await UserService.update(updatedUser, id);
        if(user){
            return res.json({message: "Se ha actualizado el registro en el sistema"});
        }
        return res.json({message: "No se ha podido actualizar el registro en el sistema"});
    }catch(error){
        next(error);
    }
}


const deleteUser = async (req, res, next) => {
    try{
        const {id} = req.params
        const user = await UserService.delete(id)
        res.json(user)
    }catch(err){
        next(err)
    }
}

const usersConversations = async (req, res, next) => {
    try {
        const {id} = req.params
        const result = await UserService.joinConversations(id)
        res.json(result)
    } catch(err) {
        next(err)
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    usersConversations
}