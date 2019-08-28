const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    require: true,
  },
  tags: {
    type: String,
  },
  upVote: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  downVote: [
    { 
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  content: {
    type: String,
    required: true,
  },
  answer: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Answer',
    }
  ]
}, { timestamps: true })

const Question = mongoose.model('question', questionSchema)
module.exports = Question
