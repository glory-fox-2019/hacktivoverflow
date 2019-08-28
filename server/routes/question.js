const router = require('express').Router()
const QuestionController = require('../controllers/question')
const { 
    authentication,
    questionAuthorization
} = require('../middlewares/auth')

router.get('/', QuestionController.getAll)
router.get('/:id', QuestionController.questionDetail)

router.use(authentication)

router.post('/', QuestionController.create)
router.patch('/upvote/:id', QuestionController.upvote)
router.patch('/downvote/:id', QuestionController.downvote)

router.patch('/:id', questionAuthorization, QuestionController.update)
router.delete('/:id', questionAuthorization, QuestionController.deleteOne)

module.exports = router
