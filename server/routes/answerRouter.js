const express = require('express')
const router = express.Router()
const answerController = require('../controllers/answerController')
const authentication = require('../middlewares/authentication')
const authorizeAnswer = require('../middlewares/authorizeAnswer')

router.use(authentication)
router.get('/', answerController.find)
router.get('/:id', answerController.findOne)
router.get('/:id/one', answerController.findbyId)
router.post('/:id', answerController.create)
router.patch('/:id', authorizeAnswer, answerController.update)
router.delete('/:id', authorizeAnswer, answerController.delete)
router.patch('/:id/upvote', answerController.upvote)
router.patch('/:id/downvote', answerController.downvote)

module.exports = router