var nodemailer = require('nodemailer');

function sendEmail(email) {

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'hello.dev20@gmail.com',
      pass: 'HelloAndi'
    }
  });

  var mailOptions = {
    from: 'tapriandi@gmail.com',
    to: `${email}`,
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

module.exports = sendEmail
