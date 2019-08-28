const Answer = require('../models/model-answer');

class ControllerAnswer {
  static getAll(req, res, next) {
    // console.log('masuk controller get all');
    Answer
      .find()
      .then(answers => {
        // console.log(Answers);
        res.status(200).json(answers)
      })
      .catch(next)
  }
  static getOne(req, res, next) {
    Answer
      .find({ userId: req.params.id })
      .then(card => {
        res.status(200).json(card)
      })
      .catch(next)
  }
  static create(req, res, next) {
    let { name, price, description, stock, userId } = req.body
    // const image = req.file ? req.file.cloudStoragePublicUrl : ''

    Answer
      .create({
        name, description, price, image, stock, userId
      })
      .then(Answer => {
        // newAnswer = {Answer, image}
        // console.log(Answer);
        res.status(201).json(Answer)
      })
      .catch(next)
  }
  static update(req, res, next) {
    // console.log('masuk update', req.body);
    const { name, price, stock, description } = req.body

    let AnswerUpdate = {
      name, price, stock, description
    }

    if (req.file) AnswerUpdate.image = req.file.cloudStoragePublicUrl

    Answer
      .findByIdAndUpdate(
        { _id: req.params.id },
        AnswerUpdate,
        { new: true, runValidators: true }
      )
      .then(Answer => {
        res.status(200).json(Answer)
      })
      .catch(next)
  }
}

module.exports = ControllerAnswer;
