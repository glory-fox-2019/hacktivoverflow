const express = require('express')
const router = express.Router()
const AnswerController = require('../controllers/AnswerController')
const authentication = require('../middleware/authentication')
// const authorization = require('../middleware/authorization')

router.use(authentication)

router.post('/downvote', AnswerController.downvote)
router.post('/upvote', AnswerController.upvote)
router.get('/:id', AnswerController.getAll)
router.post('/', AnswerController.create)
router.patch('/:id', AnswerController.update)
router.delete('/:id', AnswerController.delete)


module.exports=router

