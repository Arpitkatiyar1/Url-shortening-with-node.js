const express=require('express')
const {connectToDb}=require('./db/connect')
const path=require('path')
const app=express();
const port=8000;
const urlsRoute=require('./Route/urls')
const usersRoute=require('./Route/users')

//connecting to db
const url = "mongodb://localhost:27017/shorturl-demo";
connectToDb(url);

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//setting EJS
app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use('/urls',urlsRoute);
app.use('/users',usersRoute);

app.listen(port, console.log(`server is running at ${port}`))