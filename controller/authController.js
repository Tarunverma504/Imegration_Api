const User = require("../models/user");
const Customer = require("../models/customer");
const ForgotPassword = require("../models/forgotPassword");
const {sendMail} = require("../Utils/sendMail");
const bcrypt = require('bcryptjs');
const {
    Imegrant,
    Admin

} = require("../constants/constants");
require('dotenv').config({ path: require('find-config')('.env') });

exports.registerUser = async(req, res)=>{
    // try{
    //     const {name, email, password} = req.body;
    //     if(name.trim().length<1 || email.trim().length<1 || password.trim().length<1){
    //         res.status(401).send({ message: 'Please fill all the details'});
    //     }
    //     const result = await User.find({email:email});
    //     if(result && result.length==0){
    //         let user = await User.create({
    //             name,   
    //             email,
    //             password
    //         })
    //         if(user!=null){
    //             console.log(user);
    //             const msg = `<p>
    //             Dear Sir/Ma'am,<br/><br/>
    //             We hope this email finds you hale & hearty.<br/><br/>
    //             We want to express our sincere gratitude for accepting the invitation to collaborate with The Immigration Gurus. It's an absolute honor to partner with someone as influential and respected as you.<br/><br/>
    //             Please use the below given Unique Link to share it with your Videos or Posts to get Expression of Interest from your audience - <br/>
    //             <p><a href=https://dashboard.theimmigrationgurus.co.in/customer-form/${user._id}>Click Here</a> for further steps</p> <br/><br/>
    //             We are thrilled about the opportunity to work together and leverage your platform to promote Immigration Services for Canada, Australia, UK, USA & NZ, etc. Your audience's trust and engagement are truly invaluable, and we are excited about the potential impact our collaboration can have for our mutual growth.<br/><br/>
    //             We are fully committed to ensuring this partnership is mutually beneficial. Please feel free to share any specific preferences, guidelines, or ideas you have in mind for our affiliate marketing efforts. Your expertise and insights will be instrumental in crafting compelling and authentic content.<br/><br/>
    //             We look forward to a successful and fruitful partnership ahead. If there's anything else you need or any additional information we can provide, please don't hesitate to reach out.<br/><br/>
    //             Once again, thank you for this fantastic opportunity. We are excited about the journey ahead and eager to create valuable content together.<br/>
    //             <br/><br/>
    //             Warm regards,<br/>
    //             Marketing Team, The Immigration Gurus<br/>
    //             Email: <a href = "mailto:support@immigurus.com">support@immigurus.com</a><br/>
    //             Mob: <a href="tel:+91-9812380882">+91-9812380882</a>
                
    //             `
    //             if(sendMail(email, msg, "Immigurus Invitation"))
    //             {
    //                 console.log("Mail send successfully")
    //                 res.status(200).json({name:user.name, email:user.email, role: user.role, id:user._id})
    //             }
    //             else
    //             {
    //                 res.status(504).send({ message: 'Internalserver error'});
    //             }
    //         }
    //         else{
    //             res.status(500).send({ message: 'Internalserver error'});
    //         }
    //     }
    //     else{
    //         res.status(401).send({ message: 'Email is Already Registered'});
    //     }
    // }
    // catch(err){
    //     if(err && err.name && err.name === 'ValidationError'){
    //         const message = Object.values(err.errors).map(val => val.message)
    //         res.status(403).send({ message: message[0]});
    //     }
    //     else{
    //         console.log(err);
    //         res.status(500).json({ message: 'Internalserver error'});
    //     }
    // }


    try{
        const {name, email, password} = req.body;
        if(name.trim().length<1 || email.trim().length<1 || password.trim().length<1){
            res.status(401).send({ message: 'Please fill all the details'});
        }
        const result = await User.find({email:email});
        if(result && result.length==0){
            await User.create({
                name,   
                email,
                password
            })
            .then((data)=>{
                const msg = `<p>
                Dear Sir/Ma'am,<br/><br/>
                We hope this email finds you hale & hearty.<br/><br/>
                We want to express our sincere gratitude for accepting the invitation to collaborate with The Immigration Gurus. It's an absolute honor to partner with someone as influential and respected as you.<br/><br/>
                Please use the below given Unique Link to share it with your Videos or Posts to get Expression of Interest from your audience - <br/>
                <p><a href=https://dashboard.theimmigrationgurus.co.in/customer-form/${data._id}>Click Here</a> for further steps</p> <br/><br/>
                We are thrilled about the opportunity to work together and leverage your platform to promote Immigration Services for Canada, Australia, UK, USA & NZ, etc. Your audience's trust and engagement are truly invaluable, and we are excited about the potential impact our collaboration can have for our mutual growth.<br/><br/>
                We are fully committed to ensuring this partnership is mutually beneficial. Please feel free to share any specific preferences, guidelines, or ideas you have in mind for our affiliate marketing efforts. Your expertise and insights will be instrumental in crafting compelling and authentic content.<br/><br/>
                We look forward to a successful and fruitful partnership ahead. If there's anything else you need or any additional information we can provide, please don't hesitate to reach out.<br/><br/>
                Once again, thank you for this fantastic opportunity. We are excited about the journey ahead and eager to create valuable content together.<br/>
                <br/><br/>
                Warm regards,<br/>
                Marketing Team, The Immigration Gurus<br/>
                Email: <a href = "mailto:support@immigurus.com">support@immigurus.com</a><br/>
                Mob: <a href="tel:+91-9812380882">+91-9812380882</a>
                
                `
                if(sendMail(email, msg, "Immigurus Invitation"))
                {
                    console.log("Mail send successfully")
                    res.status(200).json({name:data.name, email:data.email, role: data.role, id:data._id})
                }
                else
                {
                    res.status(504).send({ message: 'Internalserver error'});
                }
            })
            // if(user!=null){
            //     console.log(user);
                
                
            // }
            // else{
            //     res.status(500).send({ message: 'Internalserver error'});
            // }
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
        const {name, email, phoneNumber, country} = req.body;
        const id = req.params.id;
        const user = await User.findById(id);
        if(user!=null){
            if( !name || !email || !phoneNumber || !country || name.trim().length<1 || email.trim().length<1  || country.trim().length<1){
                res.status(403).send({message:"Please fill all the details"});
            }
            else{
                await Customer.create({
                    name: name,   
                    email: email,
                    phoneNumber: phoneNumber,
                    userId: id,
                    country:country
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
    }
    catch(err){
        console.error(err);
        res.status(504).send({ message: 'Internalserver error', err:err});
    }
}

exports.forgotPassword = async(req, res)=>{
    try{
        const {email} = req.body;
        if(email.trim().length>0){
            if(isEmail(email)){
                const user = await User.findOne({email});
                if(user){
                    await ForgotPassword.create({
                        userId: user._id,
                        email: email
                    }).
                    then((data)=>{
                        console.log(data._id);
                        const msg = `<p>Hi, Please click the below link to change the password</p>
                        <a href='https://dashboard.immigurus.com//reset-password/${data._id}'>Click Here</a>`
                        if(sendMail(user.email, msg, "Change account Password request")){
                            res.status(200).json({message:"Link send successfully"});
                        }
                        else{
                            res.status(504).send({ message: 'Internalserver error', err:err});
                        }
                    })
                }
                else{
                    res.status(403).json({message:"Invalid Email"});
                }
            }
            else{
                res.status(403).json({message:"Invalid Email"});
            }
        }
        else{
            res.status(403).json({message:"Please Enter email"});
        }
    }
    catch(err){
        console.error(err);
        res.status(504).send({ message: 'Internalserver error', err:err});
    }
}

exports.updatePassword = async(req, res)=>{
    try{
        const {password, confirmPassword} = req.body;
        if(password.trim().length>0 && confirmPassword.trim().length>0){
            if(password.trim() == confirmPassword.trim()){
                const id = req.params.id;
                await ForgotPassword.findById(id)
                .then(async(data)=>{ 
                    console.log(data);
                    if(data.isActive){
                        const newPassword = await bcrypt.hash(password,10);
                        console.log(newPassword);
                        await User.findByIdAndUpdate({_id:data.userId}, {password: newPassword})
                            .then(async(data)=>{
                                await ForgotPassword.findByIdAndUpdate({_id:id}, {isActive:false})
                                .then(()=>{
                                    res.status(200).json({message:"Password updated successfully"});
                                })
                                .catch((err)=>{
                                    res.status(504).send({ message: 'Internalserver error', err:err});
                                })

                            })
                    }
                    else{
                        res.status(403).json({message:"Link Expired"});
                    }
                 
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(504).send({ message: 'Internalserver error', err:err});
                })
            }
            else{
                res.status(403).json({message:"Passwords didn't matched"});
            }
        }
        else{
            res.status(403).json({message:"Please fill all the details"});
        }

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
                await User.find({role:Imegrant}).populate("customers")
                .then((data)=>{
                    res.status(200).send(data);
                })
                .catch((err)=>{
                    res.status(504).send({ message: 'Internalserver error', err:err});
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

exports.sendInvitation=async(req,res)=>{
    try{
        const {customerEmail, pageUrl} = req.body;
        if(customerEmail.trim().length>0&&isEmail(customerEmail)){
            // const msg = `<p>Hi, Please click the below link to open the Invitation</p>
            // <a href=${pageUrl}>Click Here</a>`
            const msg = `<p>
            Dear Sir/Ma'am,<br/><br/>
            We hope this email finds you hale & hearty.<br/><br/>
            We want to express our sincere gratitude for accepting the invitation to collaborate with The Immigration Gurus. It's an absolute honor to partner with someone as influential and respected as you.<br/><br/>
            Please use the below given Unique Link to share it with your Videos or Posts to get Expression of Interest from your audience - <br/>
            <p><a href=${pageUrl}>Click Here</a> for further steps</p> <br/><br/>
            We are thrilled about the opportunity to work together and leverage your platform to promote Immigration Services for Canada, Australia, UK, USA & NZ, etc. Your audience's trust and engagement are truly invaluable, and we are excited about the potential impact our collaboration can have for our mutual growth.<br/><br/>
            We are fully committed to ensuring this partnership is mutually beneficial. Please feel free to share any specific preferences, guidelines, or ideas you have in mind for our affiliate marketing efforts. Your expertise and insights will be instrumental in crafting compelling and authentic content.<br/><br/>
            We look forward to a successful and fruitful partnership ahead. If there's anything else you need or any additional information we can provide, please don't hesitate to reach out.<br/><br/>
            Once again, thank you for this fantastic opportunity. We are excited about the journey ahead and eager to create valuable content together.<br/><br/>
            Warm regards,<br/>
            Marketing Team, The Immigration Gurus<br/>
            Email: <a href = "mailto:support@immigurus.com">support@immigurus.com</a><br/>
            Mob: <a href="tel:+91-9812380882">+91-9812380882</a>
            `
            if(sendMail(customerEmail, msg, "Immigurus Invitation")){
                res.status(200).json("Mail send successfully");
            }
            else{
                res.status(504).send({ message: 'Internalserver error'});
            }

        }else{
            res.status(403).json({message:"Bad Request"});
        }

    }
    catch(err){
        console.error(err);
        res.status(504).send({ message: 'Internalserver error', err:err});
    }

}


function isEmail(email) {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== '' && email.match(emailFormat)) { return true; }
    
    return false;
}
    