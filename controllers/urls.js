const {URLS}=require('../model/urls')
const shortid=require('shortid')

const handleGetRequest = async (req,res)=>{
    try{
        const urls=await URLS.find({})
        return res.render('home',{err:null})
    }
    catch(err){
        return res.status(400).render('home',{err:null})
    }
}

const handleNewGenerateRequest=async(req,res)=>{
    const body=req.body;
    if(!body.url) return res.render('home',{err: {message:"url is required"}})
    let idshort=shortid.generate();
    try{
        const newURL=new URLS({
            redirectUrl:body.url,
            shortID:idshort,
            visitedArray: [],
        });
        await newURL.save();
        return res.render('home',{err:null})
    }
    catch(err){
        return res.render('home',{err})
    }    
}
const handleShortIDRedirectUrlRequest=async(req,res)=>{
    try{
    const shortID=req.params.shortId;
    const url=await URLS.findOne({shortID});
    console.log(url.redirectUrl);
    return res.redirect(url.redirectUrl);
    }
    catch(err){
    return res.send(`Error: ${err.message}`)
    }
}
module.exports={
    handleGetRequest,
    handleNewGenerateRequest,
    handleShortIDRedirectUrlRequest,
}