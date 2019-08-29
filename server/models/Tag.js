const mongoose = require('mongoose')
const Schema = mongoose.Schema

let TagSchema = new Schema ({
  name: {
    type: String
  }
},{timestamps: true})

let Tag = mongoose.model('Tag', TagSchema)

module.exports = Tag