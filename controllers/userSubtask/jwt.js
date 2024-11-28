const jwt=require('jsonwebtoken') 
const jwtVerify=(token)=>{
   return jwt.verify(token,"secret_key");
}
const jwtGenerator=(user)=>{
    return jwt.sign({"userId":user._id},"secret_key",{expiresIn:'1h'});
}
module.exports={jwtVerify,jwtGenerator}