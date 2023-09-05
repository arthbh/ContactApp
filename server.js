const express=require("express")
const { connection } = require("./config/db")
const { contactRouter } = require("./router/contact.router")
const errorHandler = require("./middleware/errorhandler")
const { router } = require("./router/user.router")
require('dotenv').config()
// console.log(process) 
const app=express()
app.use(express.json())

app.use("/contacts",contactRouter)
app.use("/users",router)
// app.use(errorHandler)

app.listen(process.env.PORT,async ()=> {
    try {
        await connection
        console.log(`connected to DB @ ${process.env.mongoURL}`)
    } catch (error) {
        console.log(error)
    }
    console.log(`connected to server @ ${process.env.PORT}`)
})