const dotenv = require('dotenv');
dotenv.config({ path: require('find-config')('.env') });

var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

async function sendMail(email, msg, subject){
    const sender ={
        email: process.env.SENDER_MAIL_ID,
        name:'The Immigurus'
    }
    try{
        await apiInstance.sendTransacEmail({
            sender,
            to: [{email: email}],
            subject:`${subject}`,
            htmlContent: `${msg}`
        })
        .then((data)=>{
            console.log(data);
            return true;
        })
        .catch((err)=>{
            console.log(err);
            return false;
        })
        
    }
    catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {sendMail};
