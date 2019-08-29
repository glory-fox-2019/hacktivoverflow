const router = require('express').Router()
const userRoutes = require('./userRoutes')
const questionRoutes = require('./questionRoutes')
const answerRoutes = require('./answerRoutes')
const tagRoutes = require('./tagRoutes')

router.use('/users', userRoutes)
router.use('/questions', questionRoutes)
router.use('/answers', answerRoutes)
router.use('/tags', tagRoutes)

module.exports = router