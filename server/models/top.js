const mongoose = require('mongoose')
const Schema = mongoose.Schema

const topSchema = new Schema({
    name: String,
    topThree: [],
}, {
    timestamps: true,
    versionKey: false
})

const Top = mongoose.model('Top', topSchema)

module.exports = Top