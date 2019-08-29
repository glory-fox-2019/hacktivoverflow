const Answer = require('../models/model-answer');
const Question = require('../models/model-question');

class ControllerAnswer {
  static getAllByQuestion(req, res, next) {
    Answer
      .find({ questionId: req.params.id }).sort({createdAt: -1})
      .then(answers => {
        res.status(200).json(answers)
      })
      .catch(next)
  }
  static getOne(req, res, next) {
    Answer
      .find({ userId: req.params.id }).sort({createdAt: -1})
      .then(card => {
        res.status(200).json(card)
      })
      .catch(next)
  }
  static create(req, res, next) {

    let { content, upVote, downVote, questionId } = req.body
    let userId = req.decoded.user._id

    Answer
      .create({
        content, upVote, downVote, userId, questionId
      })
      .then(answer => {
        return Question.updateOne (
          { _id: questionId},
          { $push: { answer: answer._id }}
        );
      })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }
  static update(req, res, next) {
    
    let { content } = req.body

    Answer
    .findByIdAndUpdate(
      { _id: req.params.id },
      { content },
      { new: true, runValidators: true }
    )
    .then(answer => {
      res.status(200).json(answer)
    })
    .catch(next)
  }
  static delete(req, res, next) {
    Answer
      .findByIdAndDelete({
        _id: req.params.id
      })
      .then(answer => {
        if (answer) {
          res.status(200).json({ answer, msg: 'berhasil delete answer' })
        }
        else {
          res.status(400).json({ error: 'answer not found' })
        }
      })
      .catch(next)
  }
}

module.exports = ControllerAnswer;
