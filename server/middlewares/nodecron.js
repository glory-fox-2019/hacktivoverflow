const nodemailer = require('../helpers/nodemailer')
const Model = require('../models');

const CronJob = require('cron').CronJob;

function questionDailyContent(data){
  let questions = ''
  for(let i in data){
    let description = data[i].description
    if(description.length > 140) description = description.substring(0,10) + '...';
    
    let question =  `
      <a href="/question/:id">
        <h2>${data[i].title}</h2>
        <p>${description}</p>
      </a>    
    `
    questions += question
  }
  let content = `
  <h1>Help Others and Build your Reputation</h1>
  <div class="question--list">
    ${ questions }
  </div>
  <footer>
    <p>&copy; HacktivOverflow</p>
  </footer>`
  return content;
}

module.exports = {
  questionDaily () {   
    new CronJob('0 23 16 * * *', function() {
      console.log('Cron job is doing its job ...')

      let dt = new Date()
      dt.setDate( dt.getDate() - 1 )
      
      let mailData
      
      Model.User
        .find()
        .then(data => {
          mailData = data
          return Model.Question
          .find({'createdAt': { $gte: dt }, answers: { $size: 0 }})
        })
        .then(data => {
          let content = questionDailyContent(data)
          console.log(data, content)
          let mails = mailData.map(el => el.email)
          nodemailer.sendMail(mails, content)
        })
        .catch(err => console.log(err))
    }, null, true, 'Asia/Jakarta');
  },
  topQuestion () {

  }
}