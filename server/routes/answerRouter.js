const express = require('express')
const router = express.Router()
const answerController = require('../controllers/answerController')

router.get('/', answerController.find)
router.get('/:id', answerController.findOne)
router.post('/:id', answerController.create)
router.patch('/:id', answerController.update)
router.delete('/:id', answerController.delete)
router.patch('/:id/upvote', answerController.upvote)
router.patch('/:id/downvote', answerController.downvote)

module.exports = router