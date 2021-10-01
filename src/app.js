const express = require("express")
const userRoutes = require("./routes/users.routes")
const conversationRoutes = require("./routes/conversations.routes")
const app = express()

app.use(express.json())
app.use("/api/v1", (req, res, next) => {console.log(req.body); next()})
app.use("/api/v1", userRoutes)
app.use("/api/v1", conversationRoutes)

module.exports = app