const Model = require('../models');

class Question {
  static create(req,res,next){
    Model.Question
      .create({
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        user: req.decode._id,
      })
      .then(data => {
        return data.populate('user', 'name email').execPopulate()
      })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(next)
  }

  static edit(req,res,next){
    Model.Question
      .findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
      },{new: true})
      .populate('user', 'name email')
      .then(data => {
        if(!data) next({httpStatus: 404, message: 'Question not found'})
        else res.json(data);
      })
      .catch(next);
  }

  static delete(req,res,next){
    Model.Question
      .deleteOne({_id: req.params.id})
      .then(data => {
        if(data.deletedCount === 0) next({httpStatus: 404, message: 'Question not found'})
        res.json({
          delete: data.deletedCount,
          message: 'Successfully Delete Question',
        })
      })
      .catch(next);
  }

  static upvote(req,res,next){
    // FIND DOWNVOTE
    // FIND UPVOTE
      // IF !UPVOTE, THEN PUSH NEW UPVOTE
      
    Model.Question
      .findByIdAndUpdate(req.params.id, {
        $pull: { downvotes: req.decode._id }
      })
      .then(data => {
        return Model.Question
          .findOne({
            upvotes: req.decode._id
          })
        })
        .then(data => {
          if(data) return data
          return Model.Question
            .findByIdAndUpdate(req.params.id, {
              $push: { upvotes: req.decode._id }
            })
        })
      .then(data => {
        if(!data) next({httpStatus: 404, message: 'Question not found'})
        res.json({update: data.length, message: 'Upvote Success!'});
      })
      .catch(next);
  }
  static netralvote(req,res,next){
    Model.Question
      .findByIdAndUpdate(req.params.id, {
        $pull: { upvotes: req.decode._id }
      })
      .then(data => {
        return Model.Question
          .findByIdAndUpdate(req.params.id, {
            $pull: { downvotes: req.decode._id }
          })
      })
      .then(data => {
        if(!data) next({httpStatus: 404, message: 'Question not found'})
        res.json({update: data.length, message: 'Netral vote Success!'});
      })
  }

  static downvote(req,res,next){
    Model.Question
      .findByIdAndUpdate(req.params.id, {
        $pull: { upvotes: req.decode._id }
      })
      .then(data => {
        return Model.Question
          .findOne({
            downvotes: req.decode._id
          })
        })
        .then(data => {
          if(data) return data
          return Model.Question
            .findByIdAndUpdate(req.params.id, {
              $push: { downvotes: req.decode._id }
            })
        })
      .then(data => {
        if(!data) next({httpStatus: 404, message: 'Question not found'})
        res.json({update: data.length, message: 'Downvote Success!'});
      })
      .catch(next);
  }

  static findAll(req,res,next){
    let whereData = {}
    if(req.query.search) whereData.title = { $regex: req.query.search, $options: "i"}
    Model.Question
      .find(whereData)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .then(data => {
        res.json(data);
      })
      .catch(next);
  }
  static findAllMy(req,res,next){
    let whereData = {
      user: req.decode._id,
    }
    if(req.query.search) whereData.title = { $regex: req.query.search, $options: "i"}
    Model.Question
      .find(whereData)
      .populate('user', 'name email')
      .then(data => {
        res.json(data);
      })
      .catch(next);
  }
  static findOne(req,res,next){
    Model.Question
      .findById(req.params.id)
      .populate({
        path: 'answers',
        model: 'Answer',
        options: {
          sort: {
            'createdAt': -1
          }
        },
        populate: [
          {
            path: 'comments',
            model: 'Comment',
            populate: {
              path: 'user',
              mode: 'User',
              select: 'name',
            }
          },
          {
            path: 'user',
          }
        ]
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          model: 'User',
          select: 'name'
        }
      })
      .populate('user', 'name email')
      .then(data => {
        if(!data) next({httpStatus: 404, message: 'Question not found'})
        else res.json(data);
      })
      .catch(next);
  }

}

module.exports = Question;