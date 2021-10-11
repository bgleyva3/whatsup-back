const {Router} = require("express");

//const {conversationUsers, conversationParticipants} = require("../controllers/conversations.controllers")
const conversationCtrl = require("../controllers/conversations.controllers")
const {validateToken} = require("../middlewares/auth.middleware")

const router = Router()

router.get("/conversations", validateToken, conversationCtrl.getAll)

router.get("/conversations/:id", validateToken, conversationCtrl.getById)

router.post("/conversations", validateToken, conversationCtrl.create)

router.put("/conversations/:id", validateToken, conversationCtrl.update)

router.delete("/conversations/:id", validateToken, conversationCtrl.delete)

//Relaciones con otros modelos

router.get("/conversations/:id/users", validateToken, conversationCtrl.conversationUsers)

router.get("/conversations/:id/participants", validateToken, conversationCtrl.conversationParticipants)

router.get("/conversations/:id/messages", validateToken, conversationCtrl.conversationMessages)

router.post("/conversations/:id/messages", validateToken, conversationCtrl.postMessage)

module.exports = router