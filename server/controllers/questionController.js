const Question = require('../models/question');
const { ObjectId } = require('mongoose').Types;

class QuestionContoller {
    static create(req, res, next) {
        const { title, content, tags } = req.body;
        console.log("mmasuk")
        Question
            .create({
                title,
                content,
                tags,
                owner: req.authenticatedUser._id
            })
            .then(newQuestion => {
                res.status(201).json(newQuestion)
            })
            .catch(err => {
                if (RegExp('validation').test(err.message)) {
                    res
                        .status(403)
                        .json({
                            message: err.message
                        })
                } else {
                    next(err)
                }
            })
    }

    static update(req, res, next) {
        console.log(req.body)
        Question
            .updateOne({
                _id: req.params.id
            }, {
                $set: req.body
            })
            .then(result => {
                if (result.n && result.ok) {
                    res
                        .status(200)
                        .json(result)
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Question not found'
                        })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static upvote(req, res, next) {
        let token = req.authenticatedUser
        Question.findOne({_id : req.params.id})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                let id = req.params.id
                let checkUpvotes = data.upvotes.includes(token._id)
                let checkDownvotes = data.downvotes.includes(token._id)

                if (checkUpvotes) {
                    Question.findByIdAndUpdate(id,
                        {$pull:
                            {upvotes: token._id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        res.status(200).json( { data: updated } )
                    })
                } else if (!checkUpvotes && checkDownvotes) {
                    Question.findByIdAndUpdate(req.params.id,
                        {$pull:
                            {downvotes: token._id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        Question.findByIdAndUpdate(req.params.id,
                            {$push:
                                {upvotes: token._id}
                            },
                            {new:true}
                        )
                        .then( updated => {
                            res.status(200).json( { data: updated } )
                        })
                    })
                } else if (!checkUpvotes && !checkDownvotes) {
                    Question.findByIdAndUpdate(req.params.id,
                        {$push:
                            {upvotes: token._id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        res.status(200).json( { data: updated } )
                    })
                }
            }
        })
        .catch(next)
    }

    static downvote(req, res, next) {
        let token = req.authenticatedUser
        Question.findOne({_id : req.params.id})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                let id = req.params.id
                let checkUpvotes = data.upvotes.includes(token._id)
                let checkDownvotes = data.downvotes.includes(token._id)

                if (checkDownvotes) {
                    Question.findByIdAndUpdate(id,
                        {$pull:
                            {downvotes: token._id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        res.status(200).json( { data: updated } )
                    })
                } else if (checkUpvotes && !checkDownvotes) {
                    Question.findByIdAndUpdate(req.params.id,
                        {$pull:
                            {upvotes: token._id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        // res.status(200).json( { data: updated } )
                        Question.findByIdAndUpdate(req.params.id,
                            {$push:
                                {downvotes: token._id}
                            },
                            {new:true}
                        )
                        .then( updated => {
                            res.status(200).json( { data: updated } )
                        })
                    })
                } else if (!checkUpvotes && !checkDownvotes) {
                    Question.findByIdAndUpdate(req.params.id,
                        {$push:
                            {downvotes: token._id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        res.status(200).json( { data: updated } )
                    })
                }
            }
        })
        .catch(next)
    }

    static getAll(req, res, next) {
        let field = {};
        
        if (req.query.title) {
            field.title = {
                $regex: req.query.title,
                $options: 'i'
            };
        } else if (req.query.tags) {
            field.tags = {
                $in: req.query.tags
            };
        }
        Question
            .find(field)
            .populate('owner')
            .populate({
                path : 'answers',
                populate : {
                  path : 'owner'
                }
              })
            .sort({ created_at: -1 })
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(err => {
                next(err)
            })
    }

    static questionDetail(req, res, next) {
        Question
            .findOne({
                _id: req.params.id
            })
            .populate('owner')
            .populate({
                path: 'upvotes',
                populate: {
                    path: 'owner'
                }
            })
            .populate({
                path: 'downvotes',
                populate: {
                    path: 'owner'
                }
            })
            // .populate('comments.userId')
            .populate({
                path: 'answers',
                populate: {
                    path: 'upvotes'
                }
            })
            .populate({
                path: 'answers',
                populate: {
                    path: 'downvotes'
                }
            })
            .populate({
                path: 'answers',
                populate: {
                    path: 'owner'
                }
            })
            .then(questions => {
                res
                    .status(200)
                    .json(questions)
            })
            .catch(err => {
                next(err)
            })
    }

    static comment(req, res, next) {
        const obj = {
            content: req.body.content,
            userId: ObjectId(req.authenticatedUser._id)
        }
        Question
            .updateOne({
                _id: req.params.id
            }, {
                $push: {
                    comments: obj
                }
            })
            .then(result => {
                if (result.n && result.ok) {
                    res
                        .status(200)
                        .json(result)
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Question not found'
                        })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteOne(req, res, next) {
        Question
            .deleteOne({
                _id: req.params.id
            })
            .then(result => {
                if (result.n && result.ok) {
                    res
                        .status(200)
                        .json(result)
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Question not found'
                        })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = QuestionContoller;
