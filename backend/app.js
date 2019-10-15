const port = 8000
const host = "localhost"
const express = require("express")
const consign = require("consign")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const app = express()
const cors = require('cors')

app.set("mongoose", mongoose)
app.set("jwt", jwt)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

mongoose.connect("mongodb://localhost:27017/meanescola", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log("Conexão foi realizada com o Mongo"))
    .catch((err) => console.log("Erro ao conectar no Mongo: " + err))

consign()
    .include("models")
    .then("middlewares")
    .then("controllers")
    .then("routes")
    .into(app)


app.listen(port, host, function() {
    console.log(`Aplicação rodando no endereço ${host}:${port}`)
})
