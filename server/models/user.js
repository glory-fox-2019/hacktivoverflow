const mongoose = require('mongoose');
const bcrypt = require('../helpers/bcrypt');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: [{
      validator: function(v){
        return User
          .findOne({email: v})
          .then(user => {
            if(user) return false;
            else return true;
          })
          .catch(err => {
            return false;
          })
      },
      message: props => `${props.value} already registered by another user`,
    },{
      validator: function(v){
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} is not a valid email`,
    }]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: function(v){
        return v.length >= 8 
      },
      message: 'Password length cannot be less than 8'
    }
  },
  loginWith: {
    type: String,
    default: 'normal',
  }
},{
  versionKey: false,
  timestamps: true,
})

userSchema.pre('save', function(){
  this.password = bcrypt.hashPassword(this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
