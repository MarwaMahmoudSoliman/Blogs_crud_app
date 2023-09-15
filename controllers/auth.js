
const { Console } = require("winston/lib/winston/transports")
const User = require("../models/user")
const loggerEvent  = require("../services/logger.service")
const logger =loggerEvent ("auth")
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')
const userController={
    newUser: async(req,res) =>{
try{
    logger.warn(req.body)
logger.info(req.body)
let dublicatedEmail = await User.findOne({email:data.email})
if(dublicatedEmail){
    return res.status(400).send({
        message:"dublicted email"
    })
}
} 
catch(error){
    logger.error(error.message)
res.status(500).send({
    message:error.message 
})
}
    },
    login :async(req,res) =>{
        try{
            logger.warn(req.body)
            let {email,password} =req.body
            let  user = await User.findOne({email})
       if(!user){
 return res.status(403).send({
    message:"Invalid email or password"
 })
       }
       let validPassword = await bcrypt.compare(password,user.password )
       console.log(validPassword )
       if(!validPassword){
        return res.status(403).send({
           message:"Invalid email or password"
        })
              }
              let secretKey = process.env.SERET_KEY
              let token = await jwt.sign({id:user._id},secretKey)
            console.log(token)
            res.cookie("access_token",`Berear ${token }`,{
                httpOly:true,
               maxAge:1000*60*60*24*2
            })
            user.tokens.push(token   )
            await user.save()
       console.log(user)
            res.send()

        }
        catch(error){
            logger.error(error.message)
        res.status(500).send({
            message:error.message 
        })
    }


}}
module.exports=userController;