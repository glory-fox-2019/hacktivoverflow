const express = require('express');
const router = express.Router();
const { Authenthication , Authorized } = require('../middleware');
const {  answer_controller} = require('../controller')

router.use(Authenthication)

router.post('/'  , answer_controller.createAnswer )
router.get('/:id' , answer_controller.getAnswer)
router.put('/:id' ,   answer_controller.updateAnswer)


module.exports = router
