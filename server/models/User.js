const mongoose = require('mongoose')
const hashPassword = require('../helpers/hashPassword')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username required'],
    minlength: [4, 'Username must 4 - 15 Characters'],
    maxlength: [15, 'Username must 4 - 15 Characters']
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email format']
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    minlength: [4, 'Username must 4 - 15 Characters'],
    maxlength: [15, 'Username must 4 - 15 Characters']
  }
})

userSchema.path('email').validate(function(value) {
  return User.findOne({
    email: value
  })
  .then(user => {
    if(user) return false
  })
}, 'Email already registered')

userSchema.pre('save', function(next) {
  this.password = hashPassword(this.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
