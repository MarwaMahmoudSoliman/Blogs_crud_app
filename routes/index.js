
const express = require('express');
const router = express.Router(); 
const authRouter = require("./auth");
const userRouter = require("./user.route");
const blogRouter = require("./blog.route")
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/blog", blogRouter);
module.exports = router;