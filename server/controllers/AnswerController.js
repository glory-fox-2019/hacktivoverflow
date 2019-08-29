const Answer = require('../models/Answer')

class AnswerController {

    static create(req, res, next) {

        // console.log(req.body,"masuk Answer controller")
        let UserId = req.decode.id
        const { title, description, QuestionId } = req.body
        Answer.create({ UserId, title, description, QuestionId })
            .then(success => {
                res.status(201).json(success)
            })
            .catch(next)
    }

    static delete(req, res, next) {

        const id = req.params.id

        Answer.findByIdAndDelete(id)
            .then(success => {
                res.status(200).json(success)
            })
            .catch(next)
    }

    static update(req, res, next) {

        console.log("masuk ke update")
        let id = req.params.id
        let updatedData = {}

        req.body.title && (updatedData.title = req.body.title)
        req.body.description && (updatedData.description = req.body.description)

        Answer.findByIdAndUpdate(id, updatedData, { new: true })
            .then(success => {
                res.status(200).json(success)
            })
            .catch(next)
    }

    static getAll(req, res, next) {
        let QuestionId = req.params.id
        Answer.find({QuestionId}).sort({createdAt :'desc'}).populate("UserId")
            .then(allAnswer => {
                res.status(200).json(allAnswer)
            })
            .catch(next)
    }

    static getUserAnswers(req, res, next) {
        // console.log("masuk ke user answers")
        let UserId = req.decode.id
        Answer.find({ UserId }).sort({createdAt :'desc'}).populate("UserId")
            .then(allAnswer => {
                res.status(200).json(allAnswer)
            })
            .catch(next)
    }

    static upvote(req, res, next) {
        // console.log("masuk ke upvote answer")
        let UserId = req.decode.id
        let id = req.body.id

        Answer.findById(id)
            .then(answer => {
                let upvotes = answer.upvotes
                let downvotes = answer.downvotes
                if (downvotes.includes(UserId)) {
                    answer.downvotes.pull(UserId)
                    answer.save()
                    res.status(200).json(answer)
                }

                else if (!upvotes.includes(UserId)) {
                    answer.upvotes.push(UserId)
                    answer.save()
                    res.status(200).json(answer)
                }
                else {
                    res.status(404).json({ message: "You already upvotes this Answer" })
                }

            })
            .catch(next)

    }

    static downvote(req, res, next) {

        // console.log("masuk ke downvote answer")
        let UserId = req.decode.id
        let id = req.body.id

        Answer.findById(id)
            .then(answer => {
                let upvotes = answer.upvotes
                let downvotes = answer.downvotes
                if (upvotes.includes(UserId)) {
                    answer.upvotes.pull(UserId)
                    answer.save()
                    res.status(200).json(answer)
                }

                else if (!downvotes.includes(UserId)) {
                    answer.downvotes.push(UserId)
                    answer.save()
                    res.status(200).json(answer)
                }
                else {
                    res.status(404).json({ message: "You already downvotes this Answer" })
                }

            })
            .catch(next)

    }
}

module.exports = AnswerController




