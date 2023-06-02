const mongoose = require('mongoose')
const  {Schema} = mongoose;
const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    createdRooms:[{
        type:Schema.Types.ObjectId,
        ref:'rooms'
    }],
    joinedRooms:[{
        type:Schema.Types.ObjectId,
        ref:'rooms'
    }],

})

module.exports = mongoose.model('user',UserSchema);