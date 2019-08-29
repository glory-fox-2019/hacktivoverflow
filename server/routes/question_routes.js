const express = require('express');
const router = express.Router();
const {Authenthication , Authorized} = require('../middleware')

const { question_controller } = require('../controller')
router.use(Authenthication)

router.get('/'  , question_controller.getAll )
router.get('/searchtag' , question_controller.filterByTag)
router.post('/' ,  question_controller.createQuestion)
router.get('/:id' , question_controller.detailQuestion)
router.put('/:id' , question_controller.editQuestion);
router.delete('/:id' , question_controller.deleteQuestion)


module.exports = router
