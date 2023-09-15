
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const blogSchema = new Schema({
title:{
    type:String,
    required : true , 
    trim:true
}
,
content:{
    type:String,
    required : true , 
    
},image:{
    type:String,
    required : true , 
    trim:true
    
},


    date: {
        type:String ,
        required : true , 
    trim:true
    },
    owner:{
      type: mongoose.Types.ObjectId ,
      ref:"user" ,
      required:true
    }

     
    

})


const Blog =mongoose.model("blog",blogSchema);
module.exports=Blog