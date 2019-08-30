const express = require('express')
const router = express.Router()
const questionController = require('../controllers/questionController')
const authentication = require('../middlewares/authentication')
const authorizeQuestion = require('../middlewares/authorizeQuestion')


router.use(authentication)
router.get('/', questionController.find)
router.get('/topthree', questionController.topThree)
router.get('/:id', questionController.findOne)
router.post('/', questionController.create)
router.patch('/:id', authorizeQuestion, questionController.update)
router.delete('/:id', authorizeQuestion, questionController.delete)
router.patch('/:id/upvote', questionController.upvote)
router.patch('/:id/downvote', questionController.downvote)

module.exports = router