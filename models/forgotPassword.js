const mongoose = require('mongoose');
const forgotPassword = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    email:{
        type: String,
        required:[true, 'Please enter email'],
    },
    isActive:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model('forgotPasswords', forgotPassword);