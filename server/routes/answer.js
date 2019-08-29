const express = require('express')
const route = express.Router()
const answerController = require('../controllers/answerController')
const { authentication, answerAuthorization } = require('../middlewares/auth')

route.use(authentication)

route.post('/:questionId', answerController.create)
route.patch('/upvote/:id', answerController.upvote)
route.patch('/downvote/:id', answerController.downvote)

route.patch('/:id', answerAuthorization, answerController.update)
route.delete('/:questionId/:id', answerAuthorization, answerController.deleteOne)

module.exports = route