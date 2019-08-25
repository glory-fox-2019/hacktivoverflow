const mongoose = require('mongoose');
const answerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
},{
  versionKey: false,
  timestamps: true,
})

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;