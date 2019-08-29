const { Schema, ObjectId, model } = require('mongoose');

const questionSchema = new Schema({

  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  UserId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  AnswerId: [{
    type: ObjectId,
    ref: 'Answer'
  }],
  upvote: [{ 
    type: ObjectId,
    ref: 'User'
  }],
  downvote: [{
    type: ObjectId,
    ref: 'User'
  }],
  tags: {
    type: [String]
  }

}, {timestamps: true, versionKey: false})

const Question = model('Question', questionSchema)

module.exports = Question