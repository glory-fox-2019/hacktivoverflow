const Answer = require('../models/answer');
const Question = require('../models/question');
const Comment = require('../models/comment');

class AnswerController {
  static addAnswer(req, res, next) {
    const { user_id, question_id, text } = req.body;
    Answer.create({ user_id, text })
      .then(data => {
        return Question.updateOne(
          { _id: question_id }, 
          { $push: {answers: data._id} }
        )
      })
      .then(data => {
        res.status(201).json({ message: 'Answer created!' })
      })
      .catch( next );
  }
  
  static addAnswerComment(req, res, next) {
    const { user_id, answer_id, text } = req.body;
    
    Comment.create({ user_id, text })
      .then(data => {
        return Answer.updateOne(
          { _id: answer_id },
          { $push: { comments: data._id} }
        )
      })
      .then(() => {
        res.status(201).json({ message: 'Comment answer created!' })
      })
      .catch( next );
  }

  static deleteAnswer(req, res, next) {
    Answer.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({ message: 'Answer deleted!' })
      })
      .catch( next );
  }
}

module.exports = AnswerController;