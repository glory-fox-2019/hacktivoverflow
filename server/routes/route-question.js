const express = require('express');
const route = express.Router();
const controllerQuestion = require('../controllers/controller-question');
const { authorize, authentication } = require('../middleware/auth');

route.get('/', controllerQuestion.getAll);
route.get('/:id', controllerQuestion.getOne);
route.post('/', authentication, controllerQuestion.create);

module.exports = route