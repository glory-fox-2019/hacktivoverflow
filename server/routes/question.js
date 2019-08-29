const express = require('express')
const router = express.Router()
const questionController = require('../controllers/questionController')
const { authentication } = require('../middleware/authentication')

router.get('/', questionController.getAll)
router.get('/:id', questionController.findOne)
router.post('/create', authentication, questionController.create)
router.put('/upvote', authentication, questionController.upvote)

module.exports = router