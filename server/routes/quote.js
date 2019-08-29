const express = require('express');
const router = express.Router()
const Quote = require('../models/quote')
const id = "5d67a9eb8d71204e3e514075"
router.get('/', (req, res, next) => {
    Quote.findById(id)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(next)
})
module.exports = router
