const Question = require('../models/model-question');

class ControllerQuestion {

  static getAll(req, res, next) {
    // console.log('kkkkkk');
    Question
      .find().sort({createdAt: -1})
      // .populate('answer')
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static getOne(req, res, next) {
    Question
      .findById({ _id: req.params.id }).sort({createdAt: -1})
      .then(card => {
        res.status(200).json(card)
      })
      .catch(next)
  }

  static getByUser(req, res, next) {
    Question
      .find({ userId: req.params.id }).sort({createdAt: -1})
      .then(card => {
        res.status(200).json(card)
      })
      .catch(next)
  }

  static create(req, res, next) {
    
    let { content, title, upVote, downVote  } = req.body
    let userId = req.decoded.user._id

    Question
      .create({ content, title, userId, upVote, downVote })
      .then(question => {
        res.status(201).json(question)
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { title, content } = req.body

    Question
      .findByIdAndUpdate(
        { _id: req.params.id },
        { content, title },
        { new: true, runValidators: true }
      )
      .then(question => {
        res.status(200).json(question)
      })
      .catch(next)
  }

  static upVote(req, res, next) {
    
    let userId = localStorage.id
    let flag = false

    Question
      .find({_id: req.params.id })
      .then(question => {
        console.log(question);
        // for(let i=0; i<)
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