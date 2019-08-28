const express = require('express');
const router = express.Router();
const routerUser = require('./user');
const routerQuestion = require('./question');
const routerAnswer = require('./answer');

router.use('/question', routerQuestion);
router.use('/user', routerUser);
router.use('/answer', routerAnswer)

module.exports = router