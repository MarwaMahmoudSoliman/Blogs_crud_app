
const mongoose = require('mongoose');
const bcrypt =require('bcryptjs')
const Schema = mongoose.Schema;
const userSchema = new Schema({
firstName:{
    type:String,
    required: true,
    trim:true
}
,
lastName:{
    type:String,
    required: true,
    trim:true
},email:{
    type:String,
    required:true,
    unique:true,
    trim:true
    
},
password:{
    type:String,
    required:true,
  minlength:8,
    trim:true
},
isAdmin :{
    type : Boolean,
    default:false 
}
,
tokens:
     [{
        type:String,
        expires:"2d",
        trim:true
     }]
     ,image:{
        type:String,
        trim:true
     }
    

})
userSchema.pre('save',async function( next){
try{
if(!this.isModified('password'))

return next();

this.password =await bcrypt.hash(this.password,8)
next()
}
catch(error){
return (next(error))
}})

const User =mongoose.model("user",userSchema);
module.exports=User