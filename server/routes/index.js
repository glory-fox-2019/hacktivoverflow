const express = require('express')
const userRoutes = require('./user')
const questionRoutes = require('./question')
const answerRoutes = require('./answer')

const router = express.Router()

router.get('/', function(req, res, next) {
  res.status(200).json({
    message: 'Hello world'
  })
})

router.use('/user', userRoutes)
router.use('/question', questionRoutes)
router.use('/answer', answerRoutes)

module.exports = router
