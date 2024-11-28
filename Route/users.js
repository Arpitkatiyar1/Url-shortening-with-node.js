const express=require('express')
const router=express.Router();
const {
    handleSignupGetRequest,
    handleSignupUserPostRequest,
    handleLoginGetRequest,
    handleLoginUserPostRequest,
    handleUserHomePageRequest
}=require('../controllers/users')
//const {handleGetResetPasswordRequest, handlePostResetPasswordRequest}=require('./passwordReset')
//const {handlePostEmailVerficationRequest,handleGetEmailVerficationRequest}=require('./emailVerfication')
const {varifyEmail}=require('../controllers/userSubtask/verifyEmail')


//router.route('/resetPassword')
// .get(handleGetResetPasswordRequest)
// .post(handleGetResetPasswordRequest);

router.route('/verify-email')
.get(varifyEmail);
// .post(handlePostEmailVerficationRequest)

router.route("/signup")
.get(handleSignupGetRequest)
.post(handleSignupUserPostRequest);

router.route("/login")
.get(handleLoginGetRequest)
.post(handleLoginUserPostRequest);

module.exports=router