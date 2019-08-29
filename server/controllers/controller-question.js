const Question = require('../models/model-question');

class ControllerQuestion {

  static getAll(req, res, next) {
    // console.log('kkkkkk');
    Question
      .find().sort({ createdAt: -1 })
      // .populate('answer')
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static getOne(req, res, next) {
    Question
      .findById({ _id: req.params.id }).sort({ createdAt: -1 })
      .then(card => {
        res.status(200).json(card)
      })
      .catch(next)
  }

  static getByUser(req, res, next) {
    Question
      .find({ userId: req.params.id }).sort({ createdAt: -1 })
      .then(card => {
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

  static votes(req, res, next) {

    const voteType = req.query.type
    const questionId = req.params.id
    const userId = req.decoded.user._id

    Question
      .findOne({ _id: questionId })
      .populate("UserId")
      .then(found => {
        // console.log(found, '<---- then');
        if (!found) throw new Error('question not found')
        else {
          if (voteType == 'upvote') {
            if (found.upVote.includes(userId)) throw new Error('you already vote')
            else if (found.downVote.includes(userId)) {
              found.downVote.pull(userId)
              found.upVote.push(userId)
            }
            else found.upVote.push(userId)
          }
          else if (voteType == 'downvote') {
            if (found.downVote.includes(userId)) throw new Error('you already vote')
            else if (found.upVote.includes(userId)) {
              found.upVote.pull(userId)
              found.downVote.push(userId)
            }
            else found.downVote.push(userId)
          }
          else throw new Error('invalid vote type')
          return found.save()
        }
      })
      .then(question => res.status(200).json(question))
      .catch(next)
  }
}

module.exports = ControllerQuestion