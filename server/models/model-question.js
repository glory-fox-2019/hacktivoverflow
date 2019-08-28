const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  tags: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  }
}, { timestamps: true })

const Question = mongoose.model('question', questionSchema)
module.exports = Question