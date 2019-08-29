const mongoose = require('mongoose')
const answerSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Answer required']
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: [true, 'Question required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  upVote: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  downVote: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
})


const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer
