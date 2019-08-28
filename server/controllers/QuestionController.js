const Question = require('../models/question');

class QuestionController {
    static async create (req, res, next) {
        try {
            const { title, description } = req.body;
            const user = req.decode.id;
            const questionCreated = await Question.create({ user, title, description })
            res.status(201).json(questionCreated)
        }
        catch (err) {
            next(err)
        }
    }
    static async delete (req, res, next) {
        try {
            const id = req.params.id
            const deleted = await Question.deleteOne({ _id: id })
            res.status(200).json(deleted)
        }
        catch (err) {
            next(err)
        }
    }

    static async loadQuestion (req, res, next) {
        try {
            const questions = await Question.find().populate('user', '-password').populate({
                path: 'answer',
                populate: {
                    path: 'user',
                    select: '-password'
                }
            })
            res.status(200).json(questions)
        }
        catch (err) {
            next(err)
        }
    }

    static async updateQuestion (req, res, next) {
        try {
            const id = req.params.id;
            const { title, description } = req.body;
            const questionUpdated = await Question.findByIdAndUpdate(id, { title, description }, { new: true })
            res.status(201).json(questionUpdated)
        }
        catch (err) {
            next(err)
        }
    }

    static async voteQuestion (req, res, next) {
        try {
            const questionId = req.params.id;
            const vote = req.body.vote;
            const userId = req.decode.id;
            const findUpVote = await Question.findOne({_id: questionId, upvotes: userId})
            const findDownVote = await Question.findOne({ _id: questionId, downvotes: userId })
            const findByIdQuestion = await Question.findById(questionId)
            const findQuestion = await Question.findOne({ _id: questionId}).or([{ upvotes: userId }, { downvotes: userId }])
            if (!findQuestion) {
                findByIdQuestion[vote].push(userId)
                findByIdQuestion.save()
            }
            else {
                if (vote == 'downvotes') {
                    if (findUpVote) {
                        findByIdQuestion.upvotes.pull(userId)
                        findByIdQuestion[vote].push(userId)
                        findByIdQuestion.totalvotes = findByIdQuestion.upvotes.length - findByIdQuestion.downvotes.length;
                        findByIdQuestion.save()
                    }
                }
                else {
                    if (findDownVote) {
                        findByIdQuestion.downvotes.pull(userId)
                        findByIdQuestion[vote].push(userId)
                        findByIdQuestion.totalvotes = findByIdQuestion.upvotes.length - findByIdQuestion.downvotes.length;
                        findByIdQuestion.save()
                    }
                }
            }
            res.status(200).json(findByIdQuestion)
        }
        catch (err) {
            next(err)
        }
    }
}

module.exports = QuestionController