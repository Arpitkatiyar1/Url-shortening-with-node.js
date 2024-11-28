const {USERS}=require('../../model/users')
const resetPassword=async(req,res)=>{
    const user=await USERS.findOne({email:req.email});
    if(!user) res.send("user does not exist")
    res.render('enterPassword');
    
    next();
}
module.exports={resetPassword};