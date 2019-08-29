var nodemailer = require('nodemailer');


function sendEmail(person) {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'valhallaeighty@gmail.com',
            pass: '0721253062'
        }
    });

    var mailOptions = {
        from: 'muhammadsavero@gmail.com',
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

// let person = "saveromuhammad@yahoo.com"
// let msg = "congratulation you get the most upvotes answer"

// sendEmail(person,msg)

module.exports=sendEmail


