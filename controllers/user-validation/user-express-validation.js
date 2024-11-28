const { check, validationResult}=require('express-validator')
const {USERS} =require('../../model/users');
const { render } = require('ejs');

const userValidate=async(req,res)=>{
    const {email,password,confirmPassword,firstName,lastName}=req.body;
    await check('email')
        .isEmail().withMessage('Please provide a valid email')
        .run(req);

    return validationResult(req).array();
} 
module.exports={userValidate}