const { Schema, ObjectId, model } = require('mongoose');

const answerSchema = new Schema({

  QuestionId: {
    type: ObjectId,
    ref: 'Question',
    required: true
  },
  content: {
    type: String, 
    required: true
  },
  upvote: [{
    type: ObjectId,
    ref: 'User'
  }],
  downvote: [{
    type: ObjectId,
    ref: 'User'
  }],
  UserId: {
    type: ObjectId,
    ref: 'User',
    required: true
  }

})

const Answer = model('Answer', answerSchema)

module.exports = Answer