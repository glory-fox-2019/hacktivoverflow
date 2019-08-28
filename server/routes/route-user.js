const express = require('express');
const routes = express.Router();
// const controllerLogin = require('../controllers/controller-login');
const controllerUser = require('../controllers/controller-user');

// routes.get('/', controllerUser.list);
routes.post('/register', controllerUser.register);
routes.post('/login', controllerUser.login);
// routes.post('/googlesignin', controllerUser.signInGoogle);
// routes.get('/:todoId', controllerUser.findUserTodo);

module.exports = routes;