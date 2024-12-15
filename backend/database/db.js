const mongoose = require("mongoose");
require("dotenv").config();

const mongodb = process.env.MONGODB_URI

// console.log("MONGODB_URI:" ,mongodb)

mongoose.connect(mongodb)
.then(() =>{
    console.log("MongoDB connected")
})
.catch((err) =>{
    console.log("Error in database connection", err)
})