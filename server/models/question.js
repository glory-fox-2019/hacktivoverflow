const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer',
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  tags: {
    type: Array,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
},{
  versionKey: false,
  timestamps: true,
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;