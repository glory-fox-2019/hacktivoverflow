const router = require('express').Router()
const AnswerController = require('../controllers/answer')
const { 
    authentication,
    answerAuthorization
} = require('../middlewares/auth')

router.use(authentication)

router.post('/:questionId', AnswerController.create)
router.patch('/upvote/:id', AnswerController.upvote)
router.patch('/downvote/:id', AnswerController.downvote)

router.patch('/:id', answerAuthorization, AnswerController.update)
router.delete('/:questionId/:id', answerAuthorization, AnswerController.deleteOne)

module.exports = router
