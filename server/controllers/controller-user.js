const User = require('../models/model-user.js');
const Jwt = require('../helper/jwt');

class ControllerUser {
  static login(req, res, next) {
    let { email, password } = req.body

    User
      .findOne({ email })
      .then(user => {
        let token = Jwt.createToken({ user })
        if (user) {
          res.status(200).json({
            token,
            id: user._id,
            name: user.name,
          });
        } else {
          next({ status: 400, messages: 'email / password wrong!' })
        }
      })
      .catch(next)
  }

  static register(req, res, next) {
    let { name, email, password } = req.body

    User
      .create({
        name, email, password
      })
      .then(newUser => {
        console.log(newUser);
        res.status(201).json(newUser)
      })
      .catch(next)
  }
}

module.exports = ControllerUser