const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { hashPassword } = require('../helper/bcryptjs');

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'Must have fullname']
  },
  username: {
    type: String,
    unique: [true, 'Username must unique'],
    validate: [(val) => {
      if (val.includes(' ') || val.includes('@') || val.includes('.')) {
        return false;
      }
      return true;
    }, `Username must not contain '@', ' ', '.'`]
  },
  email: {
    type: String,
    required: [true, 'email required!'],
    unique: [true, 'email must unique'],
    validate: [function(val) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
    }, 'Email not valid']
  },
  password: {
    type: String,
    minlength: [6, `Password must have min length 8`],
    required: [true, `Password required`],
  },
  profile_pic: {
    type: String,
    default : 'https://res.cloudinary.com/dxkkt5pzu/image/upload/v1566793505/my_dafault/no-profile-picture.png',
  }
}, { timestamps: true, versionKey: false });

UserSchema.pre('save', function() {
  this.password = hashPassword(this.password);
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
