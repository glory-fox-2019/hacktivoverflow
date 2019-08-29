"use strict";

const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    service: 'Yahoo',
    host: 'smtp.mail.yahoo.com',
    port: 456,
    secure: true,
    auth: {
      type: 'login',
      user: process.env.GMAIL, // generated ethereal user
      pass: process.env.GMAIL_PASS // generated ethereal password
    },
    debug: false,
    logger: true
});


module.exports = transporter