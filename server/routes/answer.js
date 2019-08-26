const router = require('express').Router();
const AnswerController = require('../controllers/answer');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorizationAnswer');

router.use(authentication);

router.post('/', AnswerController.addAnswer);
router.delete('/:id', authorization, AnswerController.deleteAnswer);
router.post('/comment', AnswerController.addAnswerComment);


module.exports = router;