const router = require('express').Router()
const userRoute = require('./rUser')
const questionRoute = require('./rQuestion')
const answerRoute = require('./rAnswer')

router.get('/', (req,res,next) => res.send('Connected!'))
router.use('/user', userRoute)
router.use('/question',questionRoute)
router.use('/answer', answerRoute)

module.exports = router
