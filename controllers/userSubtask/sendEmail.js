const {jwtGenerator} =require("./jwt")

const nodemailer=require('nodemailer')
//creating transporter for sendig the mail;
const transporter=nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:'ktrarpit@gmail.com',
        pass:'koan mcvu cmxu vhgu'
    }
});

const sendVarificationEmail=async(user)=>{
    const token=jwtGenerator(user);
    const verificationLink=`http://localhost:8000/users/verify-email?token=${token}`
    const mailOptions = {
        from: 'ktrarpit@gmail.com',
        to: user.email,
        subject: 'Verify Your Email',
        html: `<p>Please click the following link to verify your email:</p>
        <a href="${verificationLink}">Click here to verify</a>`,
    }
    console.log(`mailoptions object created`)
    try{
        return await transporter.sendMail(mailOptions)
    }catch(err){
        return err;
    }
}
module.exports={sendVarificationEmail};