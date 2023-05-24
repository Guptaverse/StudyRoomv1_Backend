const express = require('express')
const router = express.Router()
const User = require('../models/User')


router.post("/",async (req,res)=>{
    try {
        console.log(req.body)
        const user = await User.create({
            username:req.body.username,
            password:req.body.password,
        })
    res.status(200).json({success:true,data:user})
    // res.json({success:true,data:user});
} catch (error) {
        console.log(error); 
        res.json({success:false,error});
    }
})

module.exports = router;