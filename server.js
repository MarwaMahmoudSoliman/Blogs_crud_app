

const express = require("express");
const app =express ();
const mongoose =require("mongoose");
const routes = require("./routes")
const cookieParser = require("cookie-parser")
//middleware
app.use(express.json());
app.use(cookieParser());
app.use("/api/blog",express.static("./uploads"))
app.use("/api",routes)
require("dotenv").config()
const port= process.env.PORT || 500;

const url =process.env.DB_CONNECTION_URL
mongoose.connect(url,{
 useNewUrlParser:true  ,
 useUnifiedTopology:true 
})
.then(()=>{
console.log("Database connected !!")
})
.catch(() =>{
    console.log(error.message)
})


app.listen(port,() =>{
    console.log(`the server is running on ${port}`)
})


