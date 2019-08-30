const express = require('express');
const route = express.Router();
const question = require('./route-question')
const user = require('./route-user')
const answer = require('./route-answer');

route.use('/user', user)
route.use('/question', question)
route.use('/answer', answer)

route.get('*', (req, res) => {
    res.status(404).json({msg: 'Page not found'})
});

module.exports = route;
