var nodemailer = require('nodemailer');
require("dotenv").config()
const email = process.env.EMAIL
const password = process.env.PASSWORD

function sendEmail(person) {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: email,
            pass: password
        }
    });

    var mailOptions = {
        from: email,
        to: `${person}`,
        subject: 'X overflow dengan valhalla',
        text: `Please donate to this website we are urgently needeed money`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

// let person = "jackomoi14@gmail.com"
// // let msg = "congratulation you get the most upvotes answer"

// sendEmail(person)

module.exports=sendEmail


