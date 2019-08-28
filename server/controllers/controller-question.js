const Question = require('../models/model-question');

class ControllerQuestion {

  static getAll(req, res, next) {
    Question
      .find()
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static getOne(req, res, next) {
    Question
      .findById({ _id: req.params.id })
      .then(card => {
        res.status(200).json(card)
      })
      .catch(next)
  }

  static create(req, res, next) {
    let { content, title } = req.body
    // const image = req.file ? req.file.cloudStoragePublicUrl : ''

    Question
      .create({ content, title })
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