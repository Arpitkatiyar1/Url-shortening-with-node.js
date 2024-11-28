const express=require('express')
const server=require('./server')
const path=require('path')
const app=express();
const port=8000;
const urlsRoute=require('./Route/urls')
const usersRoute=require('./Route/users')

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//setting EJS
app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use('/urls',urlsRoute);
app.use('/users',usersRoute);

app.listen(port, console.log(`server is running at ${port}`))