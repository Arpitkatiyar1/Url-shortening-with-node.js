const {USERS}=require('../../model/users')
const {verifyToken}=require('./verifyToken')

const varifyEmail=async(req,res)=>{
  try{
    const decoded=verifyToken(req.query.token);
    console.log(decoded)
    const user=await USERS.findById(decoded.userId);
    
    if(!user) throw new Error("User not found")
    if(!user.isVerified) {return {message:"email already exist"}};  
    user.isVerified=true;
    user.save();
    return res.status(200).send('Email verified successfully.');
  }
  catch(err){
    return err;
  }  
};
module.exports={varifyEmail};