const mongoose = require('mongoose');
const {Schema} = mongoose;

const ScoreSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    roomId:{
        type:Schema.Types.ObjectId,
        ref:'Rooms',
        required:true,
    },
    subjectId:{
        type:Schema.Types.ObjectId,
        ref:'subject',
        required:true,
    },
    score:{
        type:Number,
        required:true,
    }
})

module.exports = mongoose.model('score',ScoreSchema);
