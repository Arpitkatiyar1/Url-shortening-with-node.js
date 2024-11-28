const express=require('express')
const router=express.Router();
const {
    handleGetRequest,
    handleNewGenerateRequest,
    handleShortIDRedirectUrlRequest,
}=require('../controllers/urls');

router.route("/")
.get(handleGetRequest)
.post(handleNewGenerateRequest);

router.route('/:shortId')
.get(handleShortIDRedirectUrlRequest);

module.exports=router;