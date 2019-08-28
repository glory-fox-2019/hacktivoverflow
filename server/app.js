const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const errhandler = require('./middlewares/errhandler')
const app = express();

mongoose.connect('mongodb://localhost:27017/Hacktiv-Overflow', { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log(err)
    }
    else {
        console.log("Mongoose Connected..")
    }
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)
app.use(errhandler)

module.exports = app