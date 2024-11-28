const {USERS}=require('../../model/users')
const bcrypt=require('bcrypt')
const {sendVarificationEmail}=require('./sendEmail')

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
       await sendVarificationEmail(user);
       return { message:`user has been registered successfully`};
    }
    catch(err){
        return err;
    }
}
module.exports={registerUser}