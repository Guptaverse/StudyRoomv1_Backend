const mongoose = require('mongoose');
const {Schema} = mongoose;

const QuestionSchema = new Schema({
    question:{
        type:String,
        required:true,
    },
    options:[{
        type:String,
        required:true,
    }],
    answer:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('question',QuestionSchema);