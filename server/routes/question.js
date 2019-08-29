const express = require('express')
const router = express.Router()
const ControllerQuestion= require('../controllers/ControllerQuestion')
const User= require('../models/User')
const Question= require('../models/Question')
const {authentication,authorization} = require('../middlewares/auth')
const cron = require("node-cron");
let nodemailer = require("nodemailer");

router.get('/',ControllerQuestion.findAll)
router.get('/:id',ControllerQuestion.findOne)

router.use(authentication)
router.post('/',ControllerQuestion.create)
router.get('/list/myquestion',ControllerQuestion.findMine)
router.patch('/upvotes/:id',ControllerQuestion.upvotes)
router.patch('/downvotes/:id',ControllerQuestion.downvotes)

router.patch('/:id',authorization,ControllerQuestion.update)
router.delete('/:id',authorization,ControllerQuestion.deleteItem)

let transporter = nodemailer.createTransport({
    service : "Yahoo",
    host: 'smtp.mail.yahoo.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.NODE_MAILER_EMAIL, // generated ethereal user
        pass: process.env.NODE_MAILER_PASSWORD // generated ethereal password
    },
    debug: false,
    logger: true
})

cron.schedule("39 14 * * *", function() {
    console.log("running a task every 14");
    Question.find({},'upvotes User title description')
    .populate('User','name')
    .then( data => {
    let newData = data.map(e => ({name:e.User.name, title: e.title, description: e.description ,countVotes: e.upvotes.length}))
    newData = newData.sort(function(a, b){
        return -a.countVotes+b.countVotes
    })
    console.log(newData.slice(0,5));
    let cont = ''
    newData.forEach((e,i)=>{
        cont+= `\n${i+1}. ${e.title} by ${e.name}\n `
    })
    let mailContent = 
    `Hello! Welcome back in HacktivOverflow (by Romi)\nHere are today's Top Question in HacktivOverflow!\n${cont}`
    User.find ()
    .then(data =>{
        data.forEach(e=>{
            console.log(e.email);
            console.log(mailContent);
            let mailOptions = {
                from: "hacktivoverflow@yahoo.com",
                to: e.email,
                subject: `Update of Top Questions in HacktivOverflow (By Romi)`,
                text: mailContent
              };
              transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                
                } else {
                  console.log("Email successfully sent!");
                }
              });
            });
        
        })
    }) 
})



module.exports = router