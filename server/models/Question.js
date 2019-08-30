const mongoose = require('mongoose')
const Schema = mongoose.Schema

let QuestionSchema = new Schema({
  title : {
    type: String,
    required: [true, "Title cannot be empty"]
  },
  content : {
    type: String,
    required: [true, "Content cannot be empty"]
  },
  UserId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  AnswerId : [{
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  }],
  upvotes : [{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }],
  downvotes : [{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: "Tag"
  }]

    
}, {timestamps: true})

let Question = mongoose.model('Question', QuestionSchema)

module.exports = Question