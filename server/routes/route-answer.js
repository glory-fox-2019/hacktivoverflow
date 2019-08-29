const express = require('express');
const route = express.Router();
const controllerAnswer = require('../controllers/controller-answer');
const { authorize, authentication } = require('../middleware/auth');

route.get('/:id', controllerAnswer.getAllByQuestion);
route.post('/', authentication, controllerAnswer.create);
// route.post('/', authorize, upload.multer.single('image'), upload.sendUploadToGCS, controllerProduct.create)
route.patch('/:id', authorize, controllerAnswer.update)
route.delete('/:id', authorize, controllerAnswer.delete)

module.exports = route