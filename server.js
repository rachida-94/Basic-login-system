require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT||8008
const connectMongoose=require('./db/connection')
const app =express()
const router=require('./routes/userRouter')
connectMongoose()
 app.use(express.json())
 app.use('/api/users',router)

 app.listen((PORT),()=>{
    console.log(`server running in port http://localhost:${PORT}`)
 })