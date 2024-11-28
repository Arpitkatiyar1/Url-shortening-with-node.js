const { USERS } = require('../../model/users')
const {jwtGenerator}=require('./jwt')
const bcrypt=require('bcrypt')
const {sendEmail}=require('./sendEmail')

const registerUser=async (req)=>{
    try{
        if(await USERS.findOne({email:req.body.email})){
            return { message:`mail ${req.body.email} already exist`};
        }
        const hash=await bcrypt.hash(req.body.password,10);
        const user=await USERS.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:hash,
        email:req.body.email,
        })
        const token = jwtGenerator(user); 
        const mailObj = {
            link: `http://localhost:8000/users/verify-email?token=${token}`,
            subject:"Verify-mail"
        }
        try {
            await sendEmail(user, mailObj);
            console.log(`verification email successfully`)
        } catch (err) {
            console.error("User registered but failed to verify the email")
        }
        return { message:`user has been registered successfully`};
    }
    catch(err){
        return err;
    }
}
module.exports={registerUser}