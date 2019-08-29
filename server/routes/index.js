const route = require('express').Router()
const routeUser = require('./user');
const routeAnswer = require('./answer');
const routeQuestion = require('./question');

route.use('/users', routeUser)
route.use('/answers', routeAnswer)
route.use('/questions', routeQuestion)

module.exports = route