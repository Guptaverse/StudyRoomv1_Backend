const express = require('express')
require('dotenv').config();
const cors = require('cors')
const mongoose= require('mongoose')
const mongoDB = require("./db")      
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
mongoDB();

// mongoose.connect("mongodb://localhost:27017/loginRegister",{
//     useNewUrlParser:true,
//     useUnifiedTopology:true

// },()=>{
//     console.log("connected")
// }
// )

//routes
app.use('/auth',require("./Routes/auth"))
// app.use('/register',require("./Routes/createUser"))
// app.use('/login',require("./Routes/createUser"))
// app.use('/login',require("./Routes/createUser"))
// app.post("/login",(req,res)=>{
//     res.send("My api login")
// })
// app.post("/register",(req,res)=>{
//     res.send("My api register")
//     console.log(req.body)
// })

app.listen(9002,()=>{
    console.log("listening at 9002")
})