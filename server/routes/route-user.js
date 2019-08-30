const express = require('express');
const routes = express.Router();
const CronJob = require('cron').CronJob;
const User = require('../models/model-user');
const Email = require('../helper/email');
// const controllerLogin = require('../controllers/controller-login');
const controllerUser = require('../controllers/controller-user');

routes.post('/register', controllerUser.register);
routes.post('/login', controllerUser.login);

new CronJob('0 8 * * * 7', function() { // every 8:00 on sunday

  User.find()
  .then(users => {
    let promises = []
    for(let i=0; i< users.length; i++) {
      let email = users[i].email
      Email(email);
      promises.push(Email);
    }
    return Promise.all(promises);
  })
  .then(console.log);

}, null, true, 'America/Los_Angeles');

module.exports = routes;
