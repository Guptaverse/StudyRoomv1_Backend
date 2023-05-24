const mongoose = require('mongoose');
const {Schema} = mongoose;

const SubjectSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    questions:[{
        type:Schema.Types.ObjectId,
        ref:'Question'
    }],
    createAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('subject',SubjectSchema);
