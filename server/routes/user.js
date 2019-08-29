const route = require('express').Router()
const UserController = require('../controllers/user-controller');
const authentication = require('../middlewares/authentication');

route.post('/signup', UserController.signup)
route.post('/signin', UserController.signin)
route.get('/:id', authentication, UserController.findOne)

module.exports = route