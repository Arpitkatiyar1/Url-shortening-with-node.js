const {USERS}=require('../../model/users.js')
const isUsernameValid=async (name)=>{

   if(await USERS.findOne({name})){
    return [{
        msg:"user already exit please enter different username"
    }]
   }
   else if(name.length<3){
    return [{msg:"username must contain atleast 3 characters"}]
   }
   else return [];
}    
module.exports={isUsernameValid}