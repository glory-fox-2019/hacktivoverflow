const express = require('express')
const route = express.Router()
const userController = require('../controllers/userController')
const { authentication } = require('../middlewares/auth')

route.post('/register', userController.register)
route.post('/login', userController.login)

route.get('/tag', authentication, userController.getMyTag)
route.patch('/', authentication, userController.editWatchTag)

module.exports = route