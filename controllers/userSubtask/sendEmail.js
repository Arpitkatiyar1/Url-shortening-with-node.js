const nodemailer=require('nodemailer')
//creating transporter for sendig the mail;
const transporter=nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:'ktrarpit@gmail.com',
        pass:'koan mcvu cmxu vhgu'
    }
});

const sendEmail=async(user,mailObj)=>{
    const mailOptions = {
        from: 'ktrarpit@gmail.com',
        to: user.email,
        subject: mailObj.subject,
        html: `<p>Please click the following link to ${mailObj.subject}:</p>
        <a href="${mailObj.link}">Click here to ${mailObj.subject}</a>`,
    }
    try{
        return await transporter.sendMail(mailOptions)
    }catch(err){
        return err;
    }
}
module.exports={sendEmail};