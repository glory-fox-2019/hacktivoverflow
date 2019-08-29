const express = require('express');
const routes = express.Router();
// const controllerLogin = require('../controllers/controller-login');
const controllerUser = require('../controllers/controller-user');

routes.post('/register', controllerUser.register);
routes.post('/login', controllerUser.login);

module.exports = routes;