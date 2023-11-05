const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter your name'],
    },
    email:{
        type: String,
        required:[true, 'Please enter your email'],
        unique:[true, 'Email already exist'],
        validate:[validator.isEmail, 'Please enter valid email address']  //check that it is email or not
    },
    password:{
        type: String,
        required:[true, 'Please enter your password'],
        select: false
    },
    role:{
        type:String,
        default: "Imegrant"
    },
    customers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers"
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

//Encrypting password before saving user
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){  // it make sure that password is changed
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})




module.exports = mongoose.model('User', userSchema);