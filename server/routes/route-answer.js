const express = require('express');
const route = express.Router();
const controllerAnswer = require('../controllers/controller-answer');
const { authorize, authentication } = require('../middleware/auth');

route.get('/:id', controllerAnswer.getAllByQuestion);
route.post('/', authentication, controllerAnswer.create);
route.patch('/:id', authorize, controllerAnswer.update);
route.delete('/:id', authorize, controllerAnswer.delete);
// route.patch('/vote/:id', authorize, controllerAnswer.delete);

module.exports = route;