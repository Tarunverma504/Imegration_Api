const mongoose = require('mongoose');

const connectDatabase = ()=>{
    mongoose.connect(process.env.DATABASE_URI,{
    }).then(console.log("MongoDB Database Connected"));
}

module.exports = connectDatabase;