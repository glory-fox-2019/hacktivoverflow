const mongoose = require('mongoose')
const Schema = mongoose.Schema

let AnswerSchema = new Schema({
  UserId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content : {
    type: String,
    required: [true, "Cannot post empty answer"]
  },
  QuestionId : {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Question'
  },
  upvotes : [{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }],
  downvotes : [{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }],
    
}, {timestamps: true})

let Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer