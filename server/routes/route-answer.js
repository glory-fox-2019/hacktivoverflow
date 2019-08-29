const express = require('express');
const route = express.Router();
const controllerAnswer = require('../controllers/controller-answer');

route.post('/', controllerAnswer.create);
// route.get('/:id', controllerProduct.getOne)
// route.post('/', authorize, upload.multer.single('image'), upload.sendUploadToGCS, controllerProduct.create)
// route.patch('/:id', authorize, controllerProduct.update)
// route.delete('/:id', authorize, controllerProduct.delete)

module.exports = route