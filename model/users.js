const mongoose=require('mongoose')
const { type } = require('os')


const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },    
    firstName:{
        type:String,
        required:true,
    },    
    lastName:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:'user',
    },
    isVerified:{
        type:String,
        required:true,
        default:false,
    },
})
const USERS=new mongoose.model("user-db",userSchema)

module.exports={USERS};