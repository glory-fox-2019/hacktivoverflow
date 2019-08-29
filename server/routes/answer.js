const router = require('express').Router();
const AnswerController = require('../controllers/answer');
const authentication = require('../middlewares/authentication');
const { authAnswers  } = require('../middlewares/authorization');

router.use(authentication);
router.get('/:questionId', AnswerController.findAll);
router.post('/', AnswerController.create);

router.use('/:answerId', authAnswers);
router.get('/:answerId', AnswerController.findOne);
router.patch('/:answerId', AnswerController.updateOne);
router.delete('/:answerId', AnswerController.deleteOne);

module.exports = router