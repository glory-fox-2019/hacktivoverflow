const { verify } = require('../helpers/jwt')
const User = require('../models/User')

module.exports = {
  authentication : function(req, res, next) {
    try {
      const decode = verify(req.headers.token)

      User.findOne({
        email: decode.email
      })
      .then(user => {
        if(user) {
          req.user= user._id
          next()
        } else {
          next({
            status: 403,
            message: 'User not found, authentication failed'
          })
        }
      })
    }
    catch(err) {
      next({
        status: 403,
        message: err
      })
    }
  }
}