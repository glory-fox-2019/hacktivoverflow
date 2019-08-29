const express = require('express')
const router = express.Router()
const question = require('./question')
const user = require('./user')
const answer = require('./answer')

router.use('/questions',question)
router.use('/users',user)
router.use('/answers',answer)
module.exports = router