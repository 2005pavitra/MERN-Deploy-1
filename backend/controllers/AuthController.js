const UserModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false,
            });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists.",
                success: false,
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save user
        const newUser = new UserModel({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();

        // Remove password from response
        const { password: _, ...userWithoutPassword } = savedUser._doc;

        // Respond with success
        return res.status(201).json({
            message: "Signup successfully.",
            user: userWithoutPassword,
            success: true,
        });
    } catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({
            message: "Server error. Please try again.",
            success: false,
        });
    }
};


const login = async(req,res) =>{
   try {
    const {email, password} = req.body;
    // console.log(req.body)
    const existingUser = await UserModel.findOne({email})
    if(!existingUser){
        return res.status(404).json({message:"User not found.", success:false})
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if(!isMatch){
        return res.status(404).json({message:"Invalid credentials", success:false})
    }

    const token = jwt.sign({userId: existingUser._id}, process.env.JWT_SECRET, {expiresIn: "24h"});
    return res.status(200).json({message:"Login Successful", success:true ,token, name:existingUser.name})

   } catch (error) {
    console.error("Error in login",error);
    return res.status(500).json({message:"Server error. Please try again"})
   }
}



module.exports = {
    signup,
    login
}