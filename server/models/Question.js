const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title required'],
    minlength: [15, 'Title must 15 - 200 Characters'],
    maxlength: [200, 'Title must 15 - 200 Characters']
  },
  content: {
    type: String,
    required: [true, 'Content required'],
    minlength: [15, 'Content must 15 - 200 Characters'],
    maxlength: [2000, 'Content must 15 - 2000 Characters']
  },
  upVote: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  downVote: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  answer: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  }]
}, {
  timestamps: true
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question
