const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const QuestionController = require('../controllers/question-controller')

router.get('/', QuestionController.getAllQuestion)
router.get('/:questionId', QuestionController.findQuestion)

router.use(auth.authentication)

router.post('/', QuestionController.makeQuestion)
router.put('/:questionId', auth.authorQuestion, QuestionController.updateQuestion)

// delete
router.delete('/:questionId', auth.authorQuestion, QuestionController.deleteQuestion)

// upvotes & downvotes
router.post('/upvote/:questionId', QuestionController.upVote)
router.post('/downvote/:questionId', QuestionController.downVote)

module.exports = router