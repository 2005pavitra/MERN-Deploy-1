/*const router = require("express").Router();
const { signupValidation, loginValidation } = require("../middlewares/AuthValidation");

// Protected route with middleware for GET
router.get("/login",loginValidation, (req, res) => {
    console.log("-----logged in------", req.user); 
    return res.status(200).json({
        message: "Auth successful",
    });
});
router.get("/signup",signupValidation, (req, res) => {
    console.log("-----signed in------", req.user); 
    return res.status(200).json({
        message: "Auth successful",
    });
});


module.exports = router;*/

const ensureAuthentication = require("../middlewares/Auth.js");
const router = require("express").Router();

router.get("/", ensureAuthentication, (req,res) =>{
    console.log("---login successful----", res.user)
    res.status(200).json([
        {
            name:"Pavitra",
            age:20
        }
    ])
})

module.exports = router