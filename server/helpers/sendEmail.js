require('dotenv').config()
const nodemailer = require("nodemailer");

function sendEmail(data) {
  console.log(process.env.EMAIL)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: "'Ask The Map' <admin@askthemap.com>",
    to: data.email,
    subject: "Monthly Report",
    html:
      `
      <h1>Hi, ${data.name}</h1>
      <h3>Thank you for joining our community.</h3>
      <p>you asked ${data.questionCount} times and answered a question ${data.answerCount} times in total!

      <p> 
      Keep it up!
      and
      Stay Curious! </p>
      `
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('success')
    }
  });
}

module.exports = sendEmail