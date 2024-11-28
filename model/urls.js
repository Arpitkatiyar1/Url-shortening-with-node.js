const mongoose=require('mongoose')

const urlSchema=new mongoose.Schema({
    redirectUrl:{
        type: String,
    },
    shortID:{
        type: String,
    },
    visitHistory:[]
    },
    {timestamps:true}
)
const URLS=new mongoose.model("short-url",urlSchema)
module.exports={URLS};