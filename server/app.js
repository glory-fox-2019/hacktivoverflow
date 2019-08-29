if(process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

//connect ke database
require('./config/mongoose')

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes/index')
const { errorHandling } = require('./middleware/errorHandling')
const app = express()

//initial middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.use(cors())
app.use('/', routes)


//errorHandling
app.use(errorHandling)

module.exports = app
