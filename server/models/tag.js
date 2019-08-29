const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name: String,
    count: Number
}, {
        versionKey: false
    })

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag;