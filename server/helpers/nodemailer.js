const nodemailer = require("nodemailer")

module.exports = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure:false,
  auth: {
      type: 'login',
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
  }
});