const Question = require('../models/model-question');

class ControllerQuestion {

  static getAll(req, res, next) {
    Question
      .find().sort({createdAt: -1})
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static getOne(req, res, next) {
    // console.log(req.params.id);
    Question
      .findById({ _id: req.params.id })
      // .populate('userId')
      .then(card => {
        // console.log(card, '<==== card controller');
        res.status(200).json(card)
      })
      .catch(next)
  }

  static create(req, res, next) {
    let { content, title, upVote, downVote } = req.body
    let userId = req.decoded.user._id

    Question
      .create({ content, title, userId, upVote, downVote })
      .then(question => {
        res.status(201).json(question)
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { content } = req.body

    Question
      .findByIdAndUpdate(
        { _id: req.params.id },
        content,
        { new: true, runValidators: true }
      )
      .then(question => {
        res.status(200).json(question)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    Question
      .findByIdAndDelete({
        _id: req.params.id
      })
      .then(question => {
        if (question) {
          res.status(200).json({ question, msg: 'question deleted' })
        }
        else {
          res.status(400).json({ error: 'question not found' })
        }
      })
      .catch(next)
  }
}

module.exports = ControllerQuestion