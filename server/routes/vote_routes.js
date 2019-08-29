const express = require('express');
const router = express.Router();
const {Authenthication} = require('../middleware')
const {vote_controller} = require('../controller')
router.use(Authenthication)

router.put('/:id'  , vote_controller.upVote )
router.put('/:id/answer' ,  vote_controller.voteAnswer)
router.get('/' ,  vote_controller.getMostVoters)


module.exports = router
