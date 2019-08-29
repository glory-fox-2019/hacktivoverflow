const Answer = require('../models/answer');
const Question = require('../models/question');
class AnswerController {
    static async create (req, res, next) {
        try {
            const { title, description, question } = req.body;
            const user = req.decode.id
            const created = await Answer.create({ title, description, question, user });
            const pushAnswer = await Question.findById(question)
            if (pushAnswer) {
                pushAnswer.answer.push(created._id)
                pushAnswer.save()
            }
            else {
                throw {
                    status: 404,
                    message: 'Question not found'
                }
            }
            res.status(201).json(created)
        }
        catch (err) {
            next(err)
        }
    }

    static async loadAnswer (req, res, next) {
        try {
            const answers = Answer.find()
            res.status(200).json(answers)
        }
        catch (err) {
            next(err)
        }
    }

    static async voteAnswer (req, res, next) {
        try {
            const answerId = req.params.id;
            const vote = req.body.vote;
            const userId = req.decode.id;
            const findUpVote = await Answer.findOne({_id: answerId, upvotes: userId})
            const findDownVote = await Answer.findOne({ _id: answerId, downvotes: userId })
            const findByIdAnswer = await Answer.findById(answerId)
            const findAnswer = await Answer.findOne({ _id: answerId}).or([{ upvotes: userId }, { downvotes: userId }])
            if (!findAnswer) {
                findByIdAnswer[vote].push(userId)
            }
            else {
                if (vote == 'downvotes') {
                    if (findUpVote) {
                        findByIdAnswer.upvotes.pull(userId)
                        findByIdAnswer[vote].push(userId)
                    }
                    else {
                        findByIdAnswer.downvotes.pull(userId)
                    }
                }
                else {
                    if (findDownVote) {
                        findByIdAnswer.downvotes.pull(userId)
                        findByIdAnswer[vote].push(userId)
                    }
                    else {
                        findByIdAnswer.upvotes.pull(userId)
                    }
                }
            }
            findByIdAnswer.totalvotes = findByIdAnswer.upvotes.length - findByIdAnswer.downvotes.length;
            findByIdAnswer.save()
            res.status(200).json(findByIdAnswer)
        }
        catch (err) {
            next(err)
        }
    }

    static async findOneAnswer (req, res, next) {
        try {
            const id = req.params.id
            const answer = Answer.findById(id).populate('user', '-password')
            if (answer) {
                res.status(200).json(answer)
            }
            else {
                throw {
                    status: 404,
                    message: "Answer not found"
                }
            }
        }
        catch (err) {
            next(err)
        }
    }

    static async editAnswer (req, res, next) {
        try {
            const id = req.params.id;
            const { title, description } = req.body;
            const answerUpdated = await Answer.findByIdAndUpdate(id, { title, description }, { new: true })
            res.status(201).json(answerUpdated)
        }
        catch (err) {
            next(err)
        }
    }
}

module.exports = AnswerController