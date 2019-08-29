const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const tagSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Please input tag name'],
        lowercase: true
    }
})

tagSchema.plugin(uniqueValidator)

module.exports = model('Tag', tagSchema)