const express = require('express')
require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose')
const mongoDB = require("./db")
const app = express()
const http = require('http');
const { Server } = require('socket.io');

app.use(express.json())
app.use(express.urlencoded())
app.use(cors(
    {
        origin: '*',
    }
))
mongoDB();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});


io.on('connection', (socket) => {
    const { role } = socket.handshake.query;
    console.log('role', role);
    socket.on('create-room', (cb) => {
        const roomId = uuidv4();
        console.log('creating room', roomId);
        socket.join(roomId);
        console.log(roomId);
        cb(roomId);
    });
    socket.on('join-room', (user, roomId) => {
        console.log('joining room', roomId);
        socket.join(roomId);
        io.to(roomId).emit('user-connected', user);
        console.log(roomId);
    });
    socket.on('send-score', (user, score, roomId) => {
        console.log(score);
        console.log(roomId);
        console.log(user);
        io.to(roomId).emit('receive-score', user, score);
    });

    socket.on("tab-changed-send", (user, RoomId, isVisible) => {
        console.log("tab-changed-send", user, RoomId, isVisible);
        io.to(RoomId).emit("tab-changed-receive", user, isVisible);
    })

    socket.on('tab-closed-send', (user, RoomId) => {
        console.log("tab-closed-send", user, RoomId);
        io.to(RoomId).emit("tab-closed-receive", user);
    })

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


// mongoose.connect("mongodb://localhost:27017/loginRegister",{
//     useNewUrlParser:true,
//     useUnifiedTopology:true

// },()=>{
//     console.log("connected")
// }
// )

//routes
app.use('/auth', require("./Routes/auth"))
app.use('/room', require("./Routes/roomCreation"))
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


const port = 9002;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// app.listen(9002, () => {
//     console.log("listening at 9002")
// })