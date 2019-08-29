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
    const userId = req.decoded.id

    Question
      .findOne({ _id: questionId })
      .populate("UserId")
      .then(found => {
        if (!found) throw new Error('question not found')
        else {
          if (voteType == 'upvote') {
            if (found.upvote.includes(userId)) throw new Error('you already vote')
            else if (found.downvote.includes(userId)) {
              found.downvote.pull(userId)
              found.upvote.push(userId)
            }
            else found.upvote.push(userId)
          }
          else if (voteType == 'downvote') {
            if (found.downvote.includes(userId)) throw new Error('you already vote')
            else if (found.upvote.includes(userId)) {
              found.upvote.pull(userId)
              found.downvote.push(userId)
            }
            else found.downvote.push(userId)
          }
          else throw new Error('invalid vote type')
          console.log(found);
          return found.save()
        }
      })
      .then(question => res.status(200).json(question))
      .catch(next)
  }
  // static upVote(req, res, next) {
  //   console.log('masuk');

  //   let UserId = localStorage.getItem('token');
  //   let { id } = req.params

  //   Question
  //     .findOne({
  //       _id: id, upVote: UserId
  //     })
  //     .then(data => {
  //       if (data) {
  //         res.status(400).json({ message: "You can't Upvote" })
  //       } else {
  //         return Question.findOne({
  //           _id: id,
  //           downVote: UserId
  //         })
  //       }
  //     })
  //     .then(response => {
  //       if (response) {
  //         return question.findByIdAndUpdate(
  //           id,
  //           { $pull: { downvote: UserId } },
  //           { new: true }
  //         )
  //       } else {
  //         return question.findByIdAndUpdate(
  //           id,
  //           { $push: { upVote: UserId } },
  //           { new: true }
  //         )
  //       }
  //     })
  //     .then(results => {
  //       res.status(200).json(results)
  //     })
  //     .catch(next)
  // }
  // static downVote() {

  //   let UserId = req.decode.id
  //   let { id } = req.params

  //   Question.findOne({
  //     _id: id, downVote: UserId
  //   })
  //     .then(data => {
  //       if (data) {
  //         res.status(400).json({ message: "You can't Upvote" })
  //       } else {
  //         return question.findOne(
  //           { _id: id, upvote: UserId }
  //         )
  //       }
  //     })
  //     .then(response => {
  //       if (response) {
  //         return question.findByIdAndUpdate(
  //           id,
  //           { $pull: { upvote: UserId }},
  //           { new: true }
  //         )
  //       } else {
  //         return question.findByIdAndUpdate(
  //           id,
  //           { $push: { downvote: UserId }}, 
  //           { new: true }
  //         )
  //       }
  //     })
  //     .then(results => {
  //       res.status(200).json(results)
  //     })
  //     .catch(next)
  // }
}

module.exports = ControllerQuestion