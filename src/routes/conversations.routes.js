const {Router} = require("express");

//const {conversationUsers, conversationParticipants} = require("../controllers/conversations.controllers")
const conversationCtrl = require("../controllers/conversations.controllers")

const router = Router()

router.get("/conversations", conversationCtrl.getAll)

router.get("/conversations/:id", conversationCtrl.getById)

router.post("/conversations", conversationCtrl.create)

router.put("/conversations/:id", conversationCtrl.update)

router.delete("/conversations/:id", conversationCtrl.delete)

//Relaciones con otros modelos

router.get("/conversations/:id/users", conversationCtrl.conversationUsers)

router.get("/conversations/:id/participants", conversationCtrl.conversationParticipants)

router.get("/conversations/:id/messages", conversationCtrl.conversationMessages)

module.exports = router