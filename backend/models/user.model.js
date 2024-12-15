const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    }

    }, 
    {timestamps:true})


    const UserModel = mongoose.model("users", UserSchema);
    module.exports = UserModel;