require('dotenv').config()
let password = process.env.PASSWORD
let nodemailer = require('nodemailer');

function sendEmail(payload) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'questomailfearless@gmail.com',
            pass: password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let HelperOptions = {
        from: '"Questo" <questomailfearless@gmail.com>',
        to: payload.email,
        subject: 'Monthly news report from Questo',
        html:
            `
            <h1>Hello from Questo, ${payload.username} :D</h1>
            <br>
            <p>This is our monthly report about questions and answers.</p>
            <br>
            <br>
            <p style="text-align:justify">
            Check out our new questions and answers, we currently already had total of ${payload.questions} questions and ${payload.answers} answers.
            </p>
            <br>
            <br>
            <p style="font-weight: bold">Regards,</p>
            <p style="font-weight: bold">The Man you will never know</p>
            <p style="font-weight: bold">Jakarta, Indonesia</p>
            <small>${new Date().toString()}</small>
            `
    };

    transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } else {
            console.log("The message was sent!");
            console.log(info);
        }
    });
}

module.exports = sendEmail;