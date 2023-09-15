const User = require("../models/user")
const loggerEvent  = require("../services/logger.service")
const logger =loggerEvent ("auth")
const bcrypt = require("bcryptjs")
const userController = {
    deleteUser : async(req,res) =>{
        try{
logger.info(req.params)
let {id}=req.params
await User.findByIdAndDelete(id)
res.send({
    message:"Account deleted  !!"
})
res.send(id)
        }
        catch(error){
            logger.error(error.message)
        res.status(500).send({
            message:error.message 
        })
    }

    },updateUser: async(req,res) =>{
        try{
            if(req.user){
             
var image = `/api/user/${req.file.filename}`
            }
            let user = User.findByIdAndUpdate(req.user._id,{...req.body,image} ,{new:true})
            res.send(user)
        }
    
        catch(error){
            logger.error(error.message)
        res.status(500).send({
            message:error.message 
        })
    }   
    },
    updatePassword : async(req,res) =>{
        try{
let{newPassword ,oldPassword,rePassword }=req.body
let user = await User.findById(req.user._id)
let validPassword = await bcrypt.compare(oldPassword,user.password) 
if(!validPassword){
    return res.status(403).send({message :"Invalid old password "})
}
user.password =newPassword
await user.save()
res.send({message:"Password updated successfuly"})
        }
        catch(error){
            logger.error(error.message)
        res.status(500).send({
            message:error.message 
        })
    }  
    },
    getUser: async(req,res) =>{
        try{
            let user = await User.findById(req.user._id)
            res.send(user)
        }
        catch(error){
            logger.error(error.message)
        res.status(500).send({
            message:error.message 
        })
    }  
    },
    logout:async(req,res) =>{
try{
let user  = await User.findById(req.user._id)
user.tokens =user.tokens.filter((ele) =>ele !==req.token)
await user.save()
res.cookie("access_token","",{
    httpOnly:true,
    maxAge:1000*60*60*24*2
})
}catch(error){
    logger.error(error.message)
res.status(500).send({
    message:error.message 
})
}  
    }
}
module.exports =userController 