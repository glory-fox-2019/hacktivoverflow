const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const AnswerController = require('../controllers/answer-controller')

//find answer by questionId
router.get('/:questionId', AnswerController.findAnswer)

router.use(auth.authentication)

// create & delete answer
router.post('/:questionId', AnswerController.makeAnswer)
router.delete('/:questionId/:answerId/', auth.authorAnswer, AnswerController.deleteAnswer)

// find answer for edit
router.get('/find/:answerId', AnswerController.findOneAnswer)

// update answer
router.put('/:answerId', auth.authorAnswer, AnswerController.updateAnswer)

// upvotes & downvotes
router.post('/upvote/:answerId', AnswerController.upVote)
router.post('/downvote/:answerId', AnswerController.downVote)

module.exports = router