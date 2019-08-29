const Question = require('../models/question');
const Tag = require('../models/tag');

class QuestionController {

  static async create(req, res, next) {
    let newTags = [...new Set(req.body.tags)]
    try {
      for (const istag of newTags) {
        let foundTag = await Tag.findOne({
          name: istag
        })
        if (!foundTag) Tag.create({
          name: istag,
          count: 1
        })
        else {
          let currentCount = foundTag.count + 1
          let updateCount = Tag.updateOne({
            name: foundTag.name,
          }, {$set: {
            count: currentCount 
          } })
        }
      }

      let newQuestion = Question.create({
          title: req.body.title,
          content: req.body.content,
          UserId: req.decoded.id,
          tags: newTags
        })
      res.status(201).json(newQuestion)
    } catch (error) {
      next(error)
    }
  }

  static findOne(req, res, next) {
    Question.findOne({ 
      _id: req.params.id
    })
      .then(question => {
        if(question.AnswerId.length > 0) {
          return Question
            .findOne({ _id: req.params.id })
            .populate("UserId")
            .populate({path: "AnswerId", options: { sort: { 'created_at': -1 }}, populate: {path: "UserId"} }) 
        } else {
          return Question
            .findOne({ _id: req.params.id })
            .populate("UserId")
        }
      })
      .then(enak => {
        res.status(200).json(enak)
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    Question
      .find()
      .populate("UserId")
      .sort({ createdAt: -1 })
      .then(questions => res.status(200).json(questions))
      .catch(next)
  }

  static delete(req, res, next) {
    Question
      .deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({ meesage: 'deleted' })
      })
      .catch(next)
  }

  static findBelongs(req, res, next) {
    Question
      .find({ UserId: req.decoded.id })
      .populate("UserId")
      .sort({ createdAt: -1 })
      .then(questions => res.status(200).json(questions))
      .catch(next)
  }

  static update(req, res, next) {
    console.log(req.body);
    Question.updateOne({ _id: req.params.id }, req.body)
      .then(updated => {
        res.status(200).json({ message: 'updated' })
      })
      .catch(next)
  }

  static vote(req, res, next) {
    const voteType = req.query.type 
    const questionId = req.params.id
    const userId = req.decoded.id

    Question
      .findOne({ _id: questionId })
      .populate("UserId")
      .then(found => {
        if(!found) throw new Error('question not found')
        else {
          if(voteType == 'upvote') {
              if(found.upvote.includes(userId)) throw new Error('you already vote')
              else if(found.downvote.includes(userId)) {
                found.downvote.pull(userId)
                found.upvote.push(userId)
              }
              else found.upvote.push(userId)
            }
          else if(voteType == 'downvote') {  
              if(found.downvote.includes(userId)) throw new Error('you already vote')
              else if(found.upvote.includes(userId)) {
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

  static findTag(req, res ,next) {
    Question
      .find()
      .then(data => {
        let found = data.filter(el => el.tags.includes(req.params.name))
        res.status(200).json(found)
      })
      .catch(next)
  }

}

module.exports = QuestionController