require('dotenv').config()
const mongoose = require('mongoose')
const uri=process.env.MONGO_URI
const connectMongoose=()=>{ mongoose.connect(uri)
.then(()=>console.log('Successfully connected to MOngoDB!'))
.catch(err => console.error('connection error',err))
 }

module.exports= connectMongoose
