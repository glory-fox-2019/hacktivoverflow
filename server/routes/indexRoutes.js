const router = require('express').Router();
const UserRouter = require('./userRoutes');
const QuestionRouter = require('./questionRoutes');
const AnswerRouter = require('./answerRoutes');

router.use('/users', UserRouter);
router.use('/questions', QuestionRouter);
router.use('/answer', AnswerRouter);

module.exports = router;

