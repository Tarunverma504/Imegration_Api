const app = require("./app");
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const mongoose = require('mongoose');



//setting up config file
dotenv.config({ path: require('find-config')('.env') })

//connecting to database
// connectDatabase();
// const server = app.listen(process.env.PORT || "5000", ()=>{
//     console.log(`Server running at Port: 5000`)
// })

mongoose.connect(process.env.DATABASE_URI,{
}).then(()=>{console.log("MongoDB Database Connected")
    app.listen(process.env.PORT || "5000", ()=>{
            console.log(`Server running at Port: 5000`)
        })
});