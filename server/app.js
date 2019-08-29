if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { errorHandler } = require('./middlewares/errorHandler')
const sendMail = require('./helpers/mail')
mongoose.connect('mongodb://localhost/questo', {
    useNewUrlParser: true, useFindAndModify: false
});
const cors = require('cors')

const cron = require('cron')
const cronJob = cron.CronJob
const User = require('./models/user')
const Questions = require('./models/question')
const Answers = require('./models/answer')
const kue = require('kue')
const queue = kue.createQueue()

// =============== CRONJOB
new cronJob('0 6 1 * *', function () {
    let questions = Questions.find()
    let answers = Answers.find()
    let users = User.find()

    Promise.all([questions, answers, users])
        .then(([questions, answers, users]) => {
            users.forEach(user => {
                console.log('success')
                queue.create('monthly email', {
                    username: user.username,
                    email: user.email,
                    questions: questions.length,
                    answers: answers.length
                }).save()

            })
        })
        .catch(err => {
            console.log(err)
        })
}, null, true, 'Asia/Jakarta')

queue.process('monthly email', (job, done) => {
    sendMail(job.data)
    done()
})
kue.app.listen(4000)

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

const routes = require('./routes/index-route')

app.use('/', routes)

app.use(errorHandler)

module.exports = app