const User = require('../models/User')
const compareHash = require('../helpers/compareHash')
const { sign } = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    const { username, email, password } = req.body
    User.create({
      username, email, password
    })
    .then(user => {
      res.status(201).json(user)
    })
    .catch(next)
  }

  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({
      email
    })
    .then(user => {
      if(user) {
        if(compareHash(password, user.password)){
          const payload = {
            username: user.username,
            email: user.email
          }
          const token = sign(payload)
          res.status(200).json({
            message: 'success signin',
            token,
            user
          })
        }else{
          next({
            status: 400,
            message: 'Wrong email/password'
          })
        }
      }else{
        next({
          status: 400,
          message: 'Wrong email/password'
        })
      }
    })
  }

}

module.exports = UserController

