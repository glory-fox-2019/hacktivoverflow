const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/QuestionController');
const Authentication = require('../middlewares/authen');
const Authorization = require('../middlewares/author');
router.use(Authentication);

router.get('/', QuestionController.loadQuestion);
router.post('/', QuestionController.create);
router.put('/:id', Authorization, QuestionController.updateQuestion)
router.post('/:id', QuestionController.voteQuestion)
router.delete('/:id', Authorization, QuestionController.delete);

module.exports = router