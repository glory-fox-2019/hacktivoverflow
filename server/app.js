const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const errhandler = require('./middlewares/errhandler')
const app = express();
const cron = require('./helpers/cron')
const uri = process.env.uri
mongoose.connect(uri, { useNewUrlParser: true, useFindAndModify: false }, function (err) {
    if (err) {
        console.log(err)
    }
    else {
        console.log("Mongoose Connected..")
    }
})

app.use(cors())
cron()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)
app.use(errhandler)

module.exports = app