const {jwtVerify}=require("./jwt")
const verifyToken=(token)=>{
    try{
       return jwtVerify(token);
    }
    catch(err){
        return new Error(err);
    }
};
module.exports={verifyToken}