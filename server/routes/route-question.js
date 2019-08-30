const express = require('express');
const route = express.Router();
const controllerQuestion = require('../controllers/controller-question');
const { authorize, authentication } = require('../middleware/auth');

route.get('/', controllerQuestion.getAll);
route.get('/:id', controllerQuestion.getOne);
route.get('/owner/:id', controllerQuestion.getByUser);
route.post('/', authentication, controllerQuestion.create);
route.delete('/:id', authentication, controllerQuestion.delete);
route.patch('/:id', authentication, controllerQuestion.update);
route.patch('/vote/:id', authentication, controllerQuestion.votes);

module.exports = route;
