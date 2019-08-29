require('dotenv').config()

const express   = require('express')
const app       = express()
const cors      = require('cors')
const morgan    = require('morgan')
const cron      = require('node-cron')
const kue       = require('kue')
const queue     = kue.createQueue()
const User      = require('./models/user')
const Question  = require('./models/question')
const sendEmail = require('./helpers/sendEmail')
const mongoose  = require('mongoose')
const routes    = require('./routes')
const PORT      = process.env.PORT || 3000

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
.then(() => {
    console.log(`Connect to mongoose database`)
})
.catch(err => {
    console.log(err)
})

const cronMonth = '0 8 1 * *'

cron.schedule(cronMonth, () => {
    User.find({})
    .then(users => {
        users.forEach(user => {
            Question.find({owner: user._id})
            .then(questions => {
                queue.create('question-contribution', {
                    email: user.email,
                    questionsCount: questions.length
                })
                .save()  
            })
        })
    })
    .catch(err => {
        console.log(err)
    })
})
  
queue.process('question-contribution', (job, done) => {
    sendEmail({
        email: job.data.email, 
        count: job.data.questionsCount})
    done()
})

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)

app.use('/kue-api/', kue.app)

app.listen(PORT, () => {
    console.log(`App listening on port : ${PORT}`)
})
