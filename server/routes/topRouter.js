const Top = require('../models/top')
const express = require('express')
const router = express.Router()
const question = require('../controllers/questionController')

router.post('/', (req, res, next) => {
    Top.create({
        name: 'topThree',
        topThree: []
    })
    .then(data => {
        res.status(200).json(data)
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
    Top.findById('5d67a27633baa134a0f5b721')
    .then(data => {
        res.status(200).json(data.topThree)
    })
    .catch(next)
})

router.get('/three', question.topThree)
module.exports = router