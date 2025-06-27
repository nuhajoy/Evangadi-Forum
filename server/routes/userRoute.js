const express = require("express");

const router = express.Router();

const { register, login, checkUser } = require("../controller/userController")
const authMiddleware = require('../middleware/authMiddleware')


// register route
router.post("/register", register)
    

// login route

router.post("/login", login);

// check user

router.get("/checkUser",authMiddleware, checkUser);



module.exports = router;