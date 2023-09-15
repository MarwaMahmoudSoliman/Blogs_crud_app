const Blog = require("../models/blog.model")
const User = require("../models/user")
const fs = require ("fs")
const loggerEvent  = require("../services/logger.service")
const logger =loggerEvent ("auth")
const blogController = {
createBlog :async (req,res) =>{
    try{

    
   
    const date = new Date().toISOString();
    console.log(date)
    let newBlog = new Blog({...req.body,owner:req.user._id,date})


 if(req.file){
    newBlog.image = `/api/blog/${req.file.filename}`
 }
 console.log(newBlog)
 await newBlog.save()
    res.send()} 
    catch(error){
        logger.error(error.message)
    res.status(500).send({
        message:error.message 
    })
}

},
getBlog : async (req,res) => {
try{
    let blogs = await Blog.find({owner:req.user._id})
    res.send( blogs)

}
catch(error){
    logger.error(error.message)
res.status(500).send({
    message:error.message 
})
}
},
getAllBlogs : async (req,res) => {
    try{
      logger.info(req.user?.firstName)
        let blogs = await Blog.find({}).populate("owner")
        
 res.send( blogs)
    }
    catch(error){
        logger.error(error.message)
    res.status(500).send({
        message:error.message 
    })
    }
    },
updateBlog : async(req,res) =>{
    try{


if(req.file){
    let deletePath = req.file.path
    fs.unlinkSync(deletePath)
var imagePath = `/api/blog/${req.file.filename}`
   blog.title = "updated"
 }
 await Blog.findByIdAndUpdate(req.body._id,{...req.body,image:imagePath},{new:true})
 console.log( blog  )
await blog.save();
res.send()
    }
    catch(error){
        logger.error(error.message)
    res.status(500).send({
        message:error.message 
    })
    }
},
deleteBlog : async (req,res) => {
    try{
let {id} = req.params
await Blog.findByIdAndUpdate(id)
res.send()
    }
    catch(error){
        logger.error(error.message)
    res.status(500).send({
        message:error.message 
    })
    }
}
}
module.exports =  blogController