const express = require('express')
const router = express.Router()
const AnswerController = require('../controllers/AnswerController')
const authentication = require('../middleware/authentication')
const authorizationAnswer = require('../middleware/authorizationAnswer')

router.use(authentication)



router.get('/', AnswerController.getUserAnswers)
router.get('/:id', AnswerController.getAll)
router.post('/downvote', AnswerController.downvote)
router.post('/upvote', AnswerController.upvote)
router.post('/', AnswerController.create)
router.patch('/:id',authorizationAnswer, AnswerController.update)
router.delete('/:id',authorizationAnswer, AnswerController.delete)

// 0 14 * * 1






module.exports=router

