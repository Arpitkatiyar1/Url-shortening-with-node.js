const {USERS}=require('../model/users')
const {v4}=require('uuid')
const {setUser,getUser}=require('../services/auth')
const {isUsernameValid}=require('./user-validation/username')
const {isStrongPassword}=require('./user-validation/password')
const {registerUser}=require('./userSubtask/registerUser')
const {userValidate}=require("./user-validation/user-express-validation");
const validator=require('validator')
const {resetPassword}=require('./userSubtask/resetPassword.js')

const handleSignupGetRequest=async (req,res)=>{  
    return res.render('signup',{err:null});
}
const handleSignupUserPostRequest=async(req,res)=>{
    //Validating the mail
    if(!validator.isEmail(req.body.email)){
        return res.render('signup',{err:{message:"Please enter a valid email address"}})
    }
    //Validating the password
    const err=await isStrongPassword(req.body.password);
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
const handleGetResetPasswordRequest=(req,res)=>{
   try{
    return res.status(200).render('enterMailToResetPassword');
   }catch(err){
    return res.status(404).send(err.message);
   }
}
const handlePostResetPasswordRequest=async (req,resetPassword,res)=>{
      
}
module.exports={
    handleSignupGetRequest,
    handleSignupUserPostRequest,
    handleLoginUserPostRequest,
    handleLoginGetRequest,
    handlePostResetPasswordRequest,
    handleGetResetPasswordRequest,
}
