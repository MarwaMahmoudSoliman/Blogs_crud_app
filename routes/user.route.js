const express =require('express')
 const router = express.Router();
 const userCtl =require("../controllers/user")
 const auth = require("../middleware/auth.middleware")

router.route("/:id")
.delete(auth.adminAuthorization ,userCtl.deleteUser)
router.post("/logut",userCtl.logout)
router.use(auth.authentication)
router.route("/")
.get(userCtl.getUser)
.patch(userCtl.updateUser)

router.post("/update/password",userCtl.updatePassword)
module.exports =router