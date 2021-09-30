const express = require("express")
const userRoutes = require("./routes/users.routes")
const app = express()

app.use(express.json())

app.use("/api/v1", userRoutes)

module.exports = app