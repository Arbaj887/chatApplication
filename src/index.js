const express = require('express')
const app = express()
const cors= require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes.js')
const globalRoutes = require('./routes/globalRoutes.js')


require('dotenv').config()

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(userRoutes)
app.use(globalRoutes)

//-------------------------------mongoDb ---connection-------------------------------------
try{
mongoose.connect(`${process.env.MONGODB_URL}/chat_application`).then(()=>{
  console.log("mongo connected")
  
})
 

}
catch(err){
  console.log('DataBase is not connected')
}





app.listen(process.env.PORT,()=>{
  console.log("port listining",process.env.PORT)
  
  
})