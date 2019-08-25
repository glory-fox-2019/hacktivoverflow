const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Text cannot be empty']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},{
  versionKey: false,
  timestamps: true,
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;