const JWT=require('jsonwebtoken')
const secretKey="Arpit@$32@"
const setUser=(user)=>{
    return JWT.sign({
       id:user._id,
       mail:user.mail,
    },secretKey)
}
const getUser=(token)=>{
    if(!token) return null;
    return JWT.verify(token,secretKey)
}
module.exports={
    setUser,
    getUser,
}