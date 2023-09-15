const {newUserSchema,loginSchema} = require('../services/userValidation.service')
const loggerEvent  = require("../services/logger.service")
const logger =loggerEvent ("user")
function newUserValidation (req,res,next){
    try{
let {error} = newUserSchema.validate(req.body)
if(error){
    let errMsg = error.details[0].message;
    logger.warn(errMsg)
    return res.status(403).send({
        message:errMsg
    })
}
next()
    }
    
    catch(error){
        logger.error(error.message)
return res.status(500).send({
    message:error.message
})
    }
}
function loginValidation (req,res,next){
    try{
let {error} = loginSchema.validate(req.body)
if(error){
    let errMsg = error.details[0].message;
    logger.warn(errMsg)
    return res.status(403).send({
        message:errMsg
    })
}
next()
    }
    
    catch(error){
        logger.error(error.message)
return res.status(500).send({
    message:error.message
})
    }
}
module.exports ={newUserValidation, loginValidation }