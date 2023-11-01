const app = require("./app");
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');


//setting up config file
dotenv.config({ path: require('find-config')('.env') })

//connecting to database
// connectDatabase();
const server = app.listen(process.env.PORT || "5000", ()=>{
    console.log(`Server running at Port: 5000`)
})