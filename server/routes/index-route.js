const express = require('express')
const router = express.Router()

const userRoute = require('./user-route')
const questionRoute = require('./question-route')
const answerRoute = require('./answer-route')
const tagRoute = require('./tag-route')

router.use('/users', userRoute)
router.use('/questions', questionRoute)
router.use('/answers', answerRoute)
router.use('/tags', tagRoute)

module.exports = router