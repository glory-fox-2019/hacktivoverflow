const express = require('express')
const route = express.Router()
const users = require('./user')
const answers = require('./answer')
const question = require('./question')
const errorHandler = require('../middlewares/errorHandler')

route.use('/users', users)
route.use('/answers', answers)
route.use ('/questions', question)

route.use(errorHandler)

module.exports = route