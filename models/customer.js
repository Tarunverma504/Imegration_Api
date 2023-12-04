const mongoose = require('mongoose');
const validator = require('validator');
const customerSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name:{
        type:String,
        required:[true, 'Please enter Name']
    },
    email:{
        type: String,
        required:[true, 'Please enter email'],
        unique:[true, 'Email already exist'],
        validate:[validator.isEmail, 'Please enter valid email address']  //check that it is email or not 
    },
    phoneNumber:{
        type:Number,
        required:[true, 'Please enter Phone Number']
    },
    country:{
        type:String,
        default:''
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Customers', customerSchema);