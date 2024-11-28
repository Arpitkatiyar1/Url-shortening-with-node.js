const mongoose = require('mongoose')

const connectToDb = (url) => {
    mongoose.connect(url)
    .then(() => console.log('mongoDB is connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
}
module.exports={connectToDb}
