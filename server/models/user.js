const { Schema, model } = require('mongoose');
const { encrypt } = require('../helpers/bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
        username: {
            type: String,
            unique: true,
            required: [true, 'Please fill a name']
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Please fill an email'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password: {
            type: String,
            required: [true, 'Please fill a password']
        },
        watchedTags: {
            type: Array,
        },
})

userSchema.plugin(uniqueValidator);

userSchema.pre('save', function(next){
    this.password = encrypt(this.password)
    next()
})


module.exports = model('User', userSchema)
