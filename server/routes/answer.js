const express = require('express')
const router = express.Router()
const answerController = require('../controllers/answerController')
const { authentication } = require('../middleware/authentication')

router.post('/create', authentication, answerController.create)


module.exports = router
