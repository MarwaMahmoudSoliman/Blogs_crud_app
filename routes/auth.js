const express = require('express')
const router = require('express').Router(); 
const authController = require("../controllers/auth")
const {newUserValidation,loginValidation } =require("../middleware/userValidation.middleware")
router.post("/signup",newUserValidation,authController.newUser)
router.post("/login",loginValidation ,authController.login)
module.exports =router