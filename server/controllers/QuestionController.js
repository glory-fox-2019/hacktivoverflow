const Question = require('../models/Question')

class QuestionController {

    static create(req, res, next) {

        // console.log(req.body,"masuk Question controller")
        let UserId = req.decode.id
        const { title, description } = req.body
        Question.create({ UserId, title, description })
            .then(success => {
                res.status(201).json(success)
            })
            .catch(next)
    }

    static delete(req, res, next) {

        const id = req.body.id

        Question.findByIdAndDelete(id)
            .then(success => {
                res.status(200).json(success)
            })
            .catch(next)
    }

    static update(req, res, next) {

        let id = req.body.id
        let updatedData = {}

        req.body.title && (updatedData.title = req.body.title)
        req.body.description && (updatedData.description = req.body.description)

        Question.findByIdAndUpdate(id, updatedData, { new: true })
            .then(success => {
                res.status(200).json(success)
            })
            .catch(next)
    }

    static getAll(req, res, next) {

        Question.find().sort({createdAt :'desc'}).populate("UserId")
            .then(allQuestion => {
                res.status(200).json(allQuestion)
            })
            .catch(next)
    }

    static getOne(req,res,next){
        
        let id = req.params.id
        Question.findById(id).populate("UserId")
        .then(question=>{
            res.status(200).json(question)
        })
        .catch(next)
    }

    static getUserQuestions(req, res, next) {

        let UserId = req.decode.id
        Question.find({ UserId }).sort({createdAt :'desc'})
            .then(allQuestion => {
                res.status(200).json(allQuestion)
            })
            .catch(next)
    }

    static upvote(req, res, next) {

        let UserId = req.decode.id
        let id = req.body.id

        Question.findById(id)
            .then(question => {
                let upvotes = question.upvotes
                let downvotes = question.downvotes
                if (downvotes.includes(UserId)) {
                    question.downvotes.pull(UserId)
                    question.save()
                    res.status(200).json(question)
                }

                else if (!upvotes.includes(UserId)) {
                    question.upvotes.push(UserId)
                    question.save()
                    res.status(200).json(question)
                }
                else {
                    res.status(404).json({ message: "You already upvotes this question" })
                }

            })
            .catch(next)

    }

    static downvote(req, res, next) {

        let UserId = req.decode.id
        let id = req.body.id

        Question.findById(id)
            .then(question => {
                let upvotes = question.upvotes
                let downvotes = question.downvotes
                if (upvotes.includes(UserId)) {
                    question.upvotes.pull(UserId)
                    question.save()
                    res.status(200).json(question)
                }

                else if (!downvotes.includes(UserId)) {
                    question.downvotes.push(UserId)
                    question.save()
                    res.status(200).json(question)
                }
                else {
                    res.status(404).json({ message: "You already downvotes this question" })
                }

            })
            .catch(next)

    }
}

module.exports = QuestionController




