const {USERS}=require('../model/users')
const {v4}=require('uuid')
const {setUser,getUser}=require('../services/auth')
const {isUsernameValid}=require('./user-validation/username')
const {isStrongPassword}=require('./user-validation/password')
const {registerUser}=require('./userSubtask/registerUser')
const {userValidate}=require("./user-validation/user-express-validation");
const validator=require('validator')
const { resetPassword } = require('./userSubtask/resetPassword.js')
const { sendEmail } = require('./userSubtask/sendEmail.js')
const { jwtGenerator } = require('./userSubtask/jwt.js')
const bcrypt=require('bcrypt')

const handleSignupGetRequest=async (req,res)=>{  
    return res.render('signup',{err:null});
}
const handleSignupUserPostRequest=async(req,res)=>{
    //Validating the mail
    if(!validator.isEmail(req.body.email)){
        return res.render('signup',{err:{message:"Please enter a valid email address"}})
    }
    //Validating the password
    const err=await isStrongPassword(req.body.password,req.body.confirmPassword);
    if(!err.isValid){
        return res.render('signup',{err})
    }
    //Registering the user
    try{
        const err=await registerUser(req);
        return res.render('signup',{err}) ;
    } catch(err){
        res.render('signup',{err})
    }  
}
const handleLoginGetRequest=async (req,res)=>{  
    return res.render('login',{status:null});
}
const handleLoginUserPostRequest=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await USERS.findOne({email})
        if(!user) res.render('login',{status:"user not found"});
        const hash=user.password;
        bcrypt.compare(password,hash,(err,result)=>{
            if(result){
                const token=setUser(user);
                res.cookie("user-cookie",token);
                return res.redirect("/urls"); 
            }
            else return res.render('login',{status:"password in incorrect"});
            
        })        
    }
    catch(err){
         res.render('login',{status:err.message})
    }
}
const enterEmailToResetPasswordGetRequest=(req,res)=>{
   try{
    return res.status(200).render('enterEmailToResetPassword',{err:null});
   }catch(err){
    return res.status(404).send(err.message);
   }
}
const enterEmailToResetPasswordPostRequest=async (req,res)=>{
    const user = await USERS.findOne({ email: req.body.email });
    console.log();
    if (!user) return res.status(200).render('enterEmailToResetPassword', { err: { message: "User not found" } });
    
    const token=jwtGenerator(user);
    const mailObj = {
        subject: "Reset-Password",
        link:`http://localhost:8000/users/resetPassword?token=${token}&email=${req.body.email}`
    }
    const error = sendEmail(user, mailObj);
    return res.status(200).render('enterEmailToResetPassword',{err:{message:"password reset link has been sent to your mail"}});
}
const resetPasswordGetRequest = async (req, res) => {
    const { token, email } = req.query
    console.log(email)
    try {
        return res.status(200).render('enterPassword',{err:null,token,email})
    } catch (err) {
        return res.status(200).render('enterPassword',{err,token:null,email:null})
    }
}
const resetPasswordPostRequest = async(req,res)=> {
    const { password, confirmPassword } = req.body;
    const { token, email } = req.query;

    
    const err = await isStrongPassword(password, confirmPassword);
    if (!err.isValid) {
        return res.status(200).render('enterPassword', { err,token,email });
    }
    try {
        const user = await USERS.findOne({ email });
        const hash=await bcrypt.hash(password,10);
        user.password = hash;
        user.save();
        return res.status(200).render('login', { status: "Password reset successfully, Login to continue" });
    } catch (err) {
        return res.status(200).render('enterPassword', { err,token,email });
    }
}
module.exports={
    handleSignupGetRequest,
    handleSignupUserPostRequest,
    handleLoginUserPostRequest,
    handleLoginGetRequest,
    enterEmailToResetPasswordGetRequest,
    enterEmailToResetPasswordPostRequest,
    resetPasswordGetRequest,
    resetPasswordPostRequest,
}
