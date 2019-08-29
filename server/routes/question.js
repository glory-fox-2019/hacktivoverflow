const route = require('express').Router()
const QuestionController = require('../controllers/question-controller');
const authentication = require('../middlewares/authentication');
const { authorizationQuestion } = require('../middlewares/authorization');

route.post('/', authentication, QuestionController.create)
route.get('/', QuestionController.findAll)
route.get('/findBelongs', authentication, QuestionController.findBelongs)
route.get('/tag/:name', authentication, QuestionController.findTag)
route.patch('/vote/:id', authentication, QuestionController.vote)
route.get('/:id', QuestionController.findOne)
route.patch('/:id', authentication, authorizationQuestion, QuestionController.update)
route.delete('/:id', authentication, authorizationQuestion, QuestionController.delete)

module.exports = route