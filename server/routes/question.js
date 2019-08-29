const express = require('express')
const route = express.Router()
const questionController = require('../controllers/questionController')
const { authentication, questionAuthorization } = require('../middlewares/auth')

route.get('/', questionController.getAll)
route.get('/:id', questionController.questionDetail)

route.use(authentication)

route.post('/', questionController.create)
route.patch('/upvote/:id', questionController.upvote)
route.patch('/downvote/:id', questionController.downvote)

route.patch('/:id', questionAuthorization, questionController.update)
route.delete('/:id', questionAuthorization, questionController.deleteOne)


module.exports = route