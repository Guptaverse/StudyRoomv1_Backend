const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI
const mongoDB = async()=>{
    try{

        await mongoose.connect(mongoURI,{useNewUrlParser:true});       
    }
    catch(err){
        console.error(err);
    }

}
mongoose.connection.on("connected",()=>{
    console.log("connected to mongo");
})
module.exports = mongoDB;