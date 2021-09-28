const app = require("./app")
require("dotenv").config()

const PORT = process.env.PORT || 8000

console.log(process.env.DB_NAME)
console.log(process.env.DB_PASSWORD)

app.listen(PORT, () => {
    console.log(`Servidor escuchando sobre el puerto ${PORT}`)
})