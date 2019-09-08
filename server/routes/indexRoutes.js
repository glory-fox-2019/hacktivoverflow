const express = require('express')
const router = express.Router()
const answerRoutes = require('./answerRoutes')
const questionRoutes = require('./questionRoutes')
const userRoutes = require('./userRoutes')

router.get('/', function(req,res,next){
    res.send("masuk ke index routes")
})

router.use('/users',userRoutes)
router.use('/answers',answerRoutes)
router.use('/questions', questionRoutes)

module.exports = router

