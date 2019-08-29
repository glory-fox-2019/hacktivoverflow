const express = require('express');
const router = express.Router();
const routerUser = require('./user');
const routerQuestion = require('./question');
const routerAnswer = require('./answer');
const routerQuote = require('./quote');
router.use('/question', routerQuestion);
router.use('/user', routerUser);
router.use('/answer', routerAnswer);
router.use('/quote', routerQuote)

module.exports = router