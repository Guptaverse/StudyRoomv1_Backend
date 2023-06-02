const mongoose = require('mongoose');
const {Schema} = mongoose;

const RoomSchema = new Schema({
    host:{
        type:Schema.Types.ObjectId,
        ref:'user',
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
        ref:'subject'
    }],
    joinedUsers:[{
        type:Schema.Types.ObjectId,
        ref:'user'
    }],
    createAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('rooms',RoomSchema);