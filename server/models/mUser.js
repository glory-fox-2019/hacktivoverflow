const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { createPassword } = require('../helpers/bcrypt')

const UserSchema = new Schema({
    username : {
        type: String,
        required: [true, 'Please fill email fullname']
    },
    email : {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: [true, 'Please fill email address'],
        unique : true
    },
    password : {
        type: String,
        required: [true, 'Please fill password first!']
    }
})

UserSchema.pre('save', function(){
    this.password = createPassword(this.password)
})
const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel