const Question = require('../models/Question')
const Tag = require('../models/Tag')
const Answer = require('../models/Answer')

class QuestionController {
  static async create(req, res, next){
    console.log('masuk controller question create')
    let { title, content} = req.body
    let tagInput = req.body.tags
    let UserId = req.decode._id
    let tagId = []
    try {
      for (let tag of tagInput){
        let foundTag = await Tag.findOne({
          name: tag
        })

        if (!foundTag){
          let newTag = await Tag.create({
            name: tag
          })

          tagId.push(newTag._id)
        }
        else {
          tagId.push(foundTag._id)
        }
      }
      let newQuestion = await Question.create({ title, content, UserId })

      let updatedQuestion = await Question.findOneAndUpdate({
        _id: newQuestion._id,
      },{
        $push: {
          tags: {
            $each: tagId
          }
        }
      },
      {
        new: true
      })

      res.status(201).json(updatedQuestion)
    }
    catch(err){
      next(err)
    }
  }

  static findAll(req, res, next){
    console.log('masuk controller question findAll')
    Question.find().populate('UserId').populate('tags').populate('AnswerId').sort({createdAt:-1})
      .then((questions)=>{
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static userQuestion(req, res, next){
    console.log('masuk controller question userQuestion')
    Question.find({
      UserId: req.decode._id
    }).populate('UserId').populate('tags').populate('AnswerId')
      .then((questions)=>{
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static findById(req,res,next){
    console.log('masuk controller question findById', req.params.id)
    Question.findOne({
      _id: req.params.id
    }).populate('UserId').populate('tags').populate({ path: 'AnswerId', populate: { path: 'UserId'}})
      .then((question)=>{
        res.status(200).json(question)
      })
      .catch(next)
  }

  static delete(req,res,next){
    console.log('masuk controller question delete')
    let arr = []
    Question.findOne({
      _id: req.params.id
    })
      .then((question)=>{
        for (let tag of question.AnswerId){
          arr.push(Answer.deleteOne({
            _id: tag
          }))
        }
        return Promise.all(arr)
      })
      .then((data)=>{
        return Question.deleteOne({
          _id: req.params.id
        })
      })
      .then((result)=>{
        res.status(200).json({status: 'success deleted'})
      })
      .catch(next)
  }

  static async update(req,res,next){
    console.log('masuk controller question update')
    let input = {}
    req.body.title && (input.title = req.body.title)
    req.body.content && (input.content = req.body.content)
    // req.body.tags && (input.tags = req.body.tags.split(','))
    // console.log('=================', input.tags)
    let tagInput = req.body.tags
    let tagId = []

    console.log('============', req.params.id)
    try {
      await Question.updateOne({ _id: req.params.id}, {tags:[]})

      for (let tag of tagInput){
        let foundTag = await Tag.findOne({
          name: tag
        })
        
        if (!foundTag){
          let newTag = await Tag.create({
            name: tag
          })

          tagId.push(newTag._id)
        }
        else {
          tagId.push(foundTag._id)
        }
      }
    
      let newQuestion = await Question.findOneAndUpdate({ _id: req.params.id},input)
      console.log('ini new Question', newQuestion)
      let updatedQuestion = await Question.findOneAndUpdate({
        _id: newQuestion._id,
      },{
        $push: {
          tags: {
            $each: tagId
          }
        }
      },
      {
        new: true
      })

      res.status(201).json(updatedQuestion)
    }
    catch(err){
      next(err)
    }
 
  }

  static findByTag(req,res,next){
    console.log('masuk controller question controller findByTag', req.body)
    let arr = []
    let arrId = []
    for (let i=0; i<req.body.length; i++){
      // console.log(req.body[i])
      arr.push(
        Tag.findOne({
          name: req.body[i]
        })
      )
    }
    Promise.all(arr)
      .then((data)=>{
        for (let i=0; i<data.length; i++){
          if (data[i]){
            arrId.push(data[i]._id)
          }
        }
        console.log(arrId)
        return Question.find({
          tags :  { $in: arrId }
        }).populate('UserId').populate('tags').populate('AnswerId')
      })
      .then((questions)=>{
        console.log(questions.length)
        res.status(200).json(questions)
      })
      .catch(next)
    // Question.find({
    //   Tags :  { $in: req.body }
    // })
    //   .then((questions)=>{
    //     console.log(questions)
    //   })
    //   .catch(next)
  }

  static upvotes(req,res,next){
    console.log('masuk controller question upvotes', req.decode._id)
    let flag = true;
    let notFound = true;

    Question.findOne({
      _id: req.params.id
    })
      .then((question)=>{
        console.log(question.downvotes.length)
        for (let i=0; i<question.upvotes.length; i++){
          if (`${question.upvotes[i]}` === `${req.decode._id}`){
            res.status(200).json('Cannot upvotes')
            flag = false
          }
        }
        for (let i=0; i<question.downvotes.length; i++){
          if (`${question.downvotes[i]}` === `${req.decode._id}`){
            question.downvotes.splice(i, 1)
            notFound = false;
            return question.save()
          }
        }
        if (flag && notFound){
          question.upvotes.push(req.decode._id)
        }
        return question.save()
      })
      .then((result)=>{
        res.status(200).json(result)
      })
      .catch(next)
  }

  static downvotes(req, res, next){
    console.log('masuk controller question downvotes')
    let flag = true;
    let notFound = true;

    Question.findOne({
      _id: req.params.id
    })
      .then((question)=>{
        for (let i=0; i<question.downvotes.length; i++){
          if (`${question.downvotes[i]}` === `${req.decode._id}`){
            res.status(200).json('Cannot downvotes')
            flag = false
          }
        }
        for (let i=0; i<question.upvotes.length; i++){
          if (`${question.upvotes[i]}` === `${req.decode._id}`){
            question.upvotes.splice(i, 1)
            notFound = false;
            return question.save()
          }
        }
        if (flag && notFound){
          question.downvotes.push(req.decode._id)
        }
        return question.save()
      })
      .then((result)=>{
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = QuestionController