const express = require('express')
const router = express.Router()
const QuestionController = require('../controllers/QuestionController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')


router.use(authentication)
router.post('/upvote', QuestionController.upvote)
router.post('/downvote', QuestionController.downvote)
router.get('/', QuestionController.getAll)
router.get('/user',QuestionController.getUserQuestions)
router.get('/:id', QuestionController.getOne)
router.post('/', QuestionController.create)
router.patch('/:id', authorization, QuestionController.update)
router.delete('/:id', authorization, QuestionController.delete)

module.exports = router
