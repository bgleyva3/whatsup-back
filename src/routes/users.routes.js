const {Router} = require("express");
const {getAllUsers, getUserById, createUser, updateUser, deleteUser} = require("../controllers/users.controllers")
const {validateToken} = require("../middlewares/auth.middleware")

const router = Router()

router.get("/users", validateToken, getAllUsers)

router.get("/users/:id", getUserById)

router.post("/users", createUser)

router.put("/users/:id", updateUser)

router.delete("/users/:id", deleteUser)

module.exports = router