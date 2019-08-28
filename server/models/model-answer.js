const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  upVote: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  downVote: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  content: {
    type: String,
    required: true,
  }
},{timestamps:true})

const Answer = mongoose.model('answer', answerSchema);
module.exports = Answer;
