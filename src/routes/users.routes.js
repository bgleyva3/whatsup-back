const {Router} = require("express");
const {getAllUsers, getUserById, createUser, updateUser, deleteUser, usersConversations} = require("../controllers/users.controllers")
const {validateToken, restrictedPermission} = require("../middlewares/auth.middleware")

const router = Router()

router.get("/users", validateToken, getAllUsers)

router.get("/users/:id", validateToken, getUserById)

router.post("/users", createUser)

router.put("/users/:id", validateToken, restrictedPermission, updateUser)

router.delete("/users/:id", validateToken, restrictedPermission, deleteUser)


router.get("/users/:id/conversations", validateToken, usersConversations)


module.exports = router