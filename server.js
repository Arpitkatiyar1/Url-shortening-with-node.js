const dbconnect=require('./db/connect')

dbconnect.connectToMongoDB("mongodb://localhost:27017/shorturl-demo")
.then(()=>console.log('mongoDB is connected'))
.catch((err) => console.error('MongoDB connection error:', err));

module.exports={dbconnect}