const express = require('express');
const route = express.Router();
const question = require('./route-question')
const users = require('./route-user')
// const carts = require('./route-cart');

route.use('/user', users)
route.use('/question', question)
// route.use('/cart', carts)

route.get('*', (req, res) => {
    res.status(404).json({msg: 'Page not found'})
})

module.exports = route