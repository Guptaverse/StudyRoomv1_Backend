const mongoose = require('mongoose');
const {Schema} = mongoose;

const RoomSchema = new Schema({
    host:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    start:{
        type:Date,
        required:true,
    },
    socketId:{
        type:String,
        required:true,
    },
    subject:[{
        type:Schema.Types.ObjectId,
        ref:'Subject'
    }],
    joinedUsers:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    createAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('room',RoomSchema);