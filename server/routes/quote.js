const express = require('express');
const router = express.Router()
const Quote = require('../models/quote')
const id = "5d678e992fc42c22a287ffb4"
router.get('/', (req, res, next) => {
    Quote.findById(id)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(next)
})
module.exports = router
