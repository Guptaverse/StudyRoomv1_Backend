const User = require('../models/User')
exports.register = async(req,res)=>{
    try {
        const existingUser = await User.findOne({username : req.body.username})
        if(existingUser){
            return res.json({ success: false, message: 'User already exists' });
        }
        console.log(req.body)
        const user = await User.create({
            username:req.body.username,
            password:req.body.password,
            email:req.body.email
        })
    res.status(200).json({success:true,data:user})
    // res.json({success:true,data:user});
} catch (error) {
        console.log(error); 
        res.json({success:false,error});
    }
}

exports.login = async(req,res)=>{
    try{
        const {username,password}= req.body;
        const user = await User.findOne({username})
        
        if(!user){
            return res.json({success:false,error:"user nhi hai"})
        }
        if(password !== user.password){
            return res.json({success:false,error:"password galat hai"})
        }
        return res.json({success:true,user,message:"Login Successfully"})
    }
    catch(error){
        console.log(error); 
        res.json({success:false,error});       
    }
}

