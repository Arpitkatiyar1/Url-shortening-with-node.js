const express=require('express')
const router=express.Router();
const {
    handleSignupGetRequest,
    handleSignupUserPostRequest,
    handleLoginGetRequest,
    handleLoginUserPostRequest,
    handleGetResetPasswordRequest,
    handlePostResetPasswordRequest,
}=require('../controllers/users')
const {varifyEmail}=require('../controllers/userSubtask/verifyEmail')


router.route('/enterEmailToResetPassword')
.get(handleGetResetPasswordRequest)
.post(handlePostResetPasswordRequest);

router.route('/verify-email')
.get(varifyEmail);

router.route("/signup")
.get(handleSignupGetRequest)
.post(handleSignupUserPostRequest);

router.route("/login")
.get(handleLoginGetRequest)
.post(handleLoginUserPostRequest);

module.exports=router