const User = require("../models/user");
const Customer = require("../models/customer");
const bcrypt = require('bcryptjs');
const {
    Imegrant,
    Admin

} = require("../constants/constants");
require('dotenv').config({ path: require('find-config')('.env') });

exports.registerUser = async(req, res)=>{
    try{
        const {name, email, password} = req.body;
        if(name.trim().length<1 || email.trim().length<1 || password.trim().length<1){
            res.status(401).send({ message: 'Please fill all the details'});
        }
        const result = await User.find({email:email});
        if(result && result.length==0){
            let user = await User.create({
                name,   
                email,
                password
            })
            if(user!=null){
                console.log(user);
                res.status(200).json({name:user.name, email:user.email, role: user.role, id:user._id})
            }
            else{
                res.status(500).send({ message: 'Internalserver error'});
            }
        }
        else{
            res.status(401).send({ message: 'Email is Already Registered'});
        }
    }
    catch(err){
        if(err && err.name && err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(val => val.message)
            res.status(403).send({ message: message[0]});
        }
        else{
            console.log(err);
            res.status(500).json({ message: 'Internalserver error'});
        }
    }
}

exports.loginUser = async(req, res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            res.status(401).send({message: 'Please enter email & password'});
        }

        //Finding user in database 
        const user = await User.findOne({email}).select('+password');
        if(!user){
            res.status(401).send({message: 'Invalid Email or Password'});
        }

        //checks if password is correct or not
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if(!isPasswordMatched){
            res.status(401).send({message: 'Invalid Email or Password'});
        }
        res.status(200).json({name:user.name, email:user.email, role: user.role, id:user._id})
    }
    catch(err){
        console.error(err);
        res.status(504).send({ message: 'Internalserver error', err:err});
    }
}

exports.addCustomer = async(req, res)=>{
    try{
        const {name, email, phoneNumber} = req.body;
        const id = req.params.id;
        const user = await User.findById(id);
        if(user!=null){
            if( !name || !email || !phoneNumber || name.trim().length<1 || email.trim().length<1){
                res.status(403).send({message:"Please fill all the details"});
            }
            else{
                await Customer.create({
                    name: name,   
                    email: email,
                    phoneNumber: phoneNumber,
                    userId: id
                })
                .then(async(data)=>{
                    console.log(data);
                    await User.findByIdAndUpdate({_id: id}, {$push:{customers:data._id}})
                        .then((data)=>{
                            console.log(data);
                            res.status(200).send({message:"Success"});
                        })
                        .catch((err)=>{
                            res.status(500).send({ message: 'Internalserver error', err:err});
                        })
                })
                .catch((err)=>{
                    res.status(504).send({ message: 'Internalserver error', err:err});  
                })

            }
        }
        else{
            res.status(403).json({message:"Invalid Imegrant"});
        }
        //res.send(req);
    }
    catch(err){
        console.error(err);
        res.status(504).send({ message: 'Internalserver error', err:err});
    }
}


exports.getUsersList = async(req, res)=>{
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        if(user!=null){
            if(user.role == Imegrant){
                await User.findById(id).populate("customers")
                    .then((data)=>{
                        res.status(200).send(data);
                    })
                    .catch((err)=>{
                        res.status(504).send({ message: 'Internalserver error', err:err});
                    })
            }
            else if(user.role == Admin){
                await User.find({role:Imegrant})
                .then((data)=>{
                    res.send(data);
                })
                .catch((err)=>{
                    res.send(err);
                })
            }
        }
        else{
            res.status(403).json({message:"Invalid User"});
        }
    }
    catch(err){
        console.error(err);
        res.status(504).send({ message: 'Internalserver error', err:err});
    }
}