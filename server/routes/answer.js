const route = require('express').Router()
const AnswerController = require('../controllers/answer-controller'); 
const authentication = require('../middlewares/authentication');
const { authorizationAnswer } = require('../middlewares/authorization');

route.post('/', AnswerController.create)
route.get('/', AnswerController.findAll)
route.get('/:id', AnswerController.findOne)
route.patch('/vote/:id', authentication, AnswerController.vote)
route.patch('/:id', authentication, authorizationAnswer, AnswerController.update)
route.delete('/:id', authentication, authorizationAnswer,  AnswerController.delete)

module.exports = route