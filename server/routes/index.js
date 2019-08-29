const express = require('express');
const router = express.Router();
const user_routes = require('./user_routes')
const question_routes = require('./question_routes')
const answer_routes = require('./answer_routes')
const vote_routes  = require('./vote_routes')

router.use('/user' , user_routes)
router.use('/question' ,  question_routes)
router.use('/answer' , answer_routes)
router.use('/vote' ,  vote_routes)

module.exports = router