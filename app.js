const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const auth = require('./routes/auth');
dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json());

app.use('/api/v1', auth);

app.get("/", async(req, res)=>{
    res.send("Imegration")
})
module.exports = app;