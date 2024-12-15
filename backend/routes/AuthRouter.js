const { loginValidation, signupValidation } = require('../middlewares/AuthValidation');
const {login, signup} = require("../controllers/AuthController")

const router = require('express').Router();

router.post("/login",loginValidation,login)

router.post("/signup",signupValidation, signup)


module.exports = router