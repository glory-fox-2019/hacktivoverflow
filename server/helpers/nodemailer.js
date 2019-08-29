'use strict';
const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   let transporter = nodemailer.createTransport({
//     host: 'gmail',
//     auth: {
//       user: process.env.GMAIL_USERNAME, // generated ethereal user
//       pass: process.env.GMAIL_PASSWORD // generated ethereal password
//     }
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//       from: '"HacktivOverflow" <hello.hacktivoverflow@gmail.com>', // sender address
//       to: 'bar@example.com',
//       subject: 'Hello ✔',
//       text: 'Hello world?',
//       html: '<b>Hello world?</b>'
//   });

//     console.log('Message sent: %s', info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USERNAME, // generated ethereal user
    pass: process.env.GMAIL_PASSWORD // generated ethereal password
  }
});

module.exports = {
  sendMail (mails, content) {
    let mailPromises = []
    for (let i in mails) {
      let newPromise = new Promise ((resolve, reject) => {
        transporter.sendMail({
          from: 'hello.hacktivoverflow@gmail.com', // sender address
          to: mails[i],
          subject: 'Hello ✔',
          text: 'Hello world?',
          html: content
        })
        .then(info => {
          resolve(info)
        })
        .catch(err => {
          reject(err)
        })
      })
      mailPromises.push(newPromise)
    }
    Promise.all(mailPromises)
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log(err)
    })
  }
}
