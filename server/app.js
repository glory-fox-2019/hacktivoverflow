if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const cron = require('node-cron')
const kue = require('kue')
const queue = kue.createQueue()
const User = require('./models/user')
const Question = require('./models/question')
const Answer = require('./models/answer')
const sendEmail = require('./helpers/sendEmail')
const port = process.env.PORT || 3000
const route = require('./routes')
const mongoose = require('mongoose')

// sends email every 1st day of the month at 8AM
const cronMonth = '0 8 1 * *'
cron.schedule(cronMonth, () => {
    User
        .find({})
        .then(users => {
            users.forEach(user => {
                let question = Question.find({owner: user._id})
                let answer = Answer.find({owner:user._id})

                Promise.all([question,answer])
                    .then(result => {
                        console.log(result)
                        queue.create('monthly email', {
                            email: user.email,
                            name: user.name,
                            questionsCount: result[0].length,
                            answersCount: result[1].length
                        
                        })
                        .save()  
                })
        })
    })
    .catch(err => {
        console.log(err)
    })
});
  
queue.process('monthly email', (job, done) => {
    sendEmail({
        email: job.data.email, 
        name: job.data.name,
        questionCount: job.data.questionsCount,
        answerCount: job.data.answersCount
    })
    done()
})

kue.app.listen(4000)

app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

mongoose.connect(process.env.DB_URL, {useNewUrlParser : true}, (err) => {
    if(err) console.log('mongoose connection failed')
    else console.log('mongoose connection success')
})

app.use('/', route)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})