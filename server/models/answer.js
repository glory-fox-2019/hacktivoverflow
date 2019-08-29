const { Schema, model, ObjectId } = require('mongoose')

const answerSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Please input answer description']
    },
    upvotes: [{
        type: ObjectId,
        ref: 'User'
    }],
    downvotes: [{
        type: ObjectId,
        ref: 'User'
    }],
    questionId: { type: ObjectId, ref: 'Question'},
    author: { type: ObjectId, ref: 'User'},
}, { timestamps: true })

module.exports = model('Answer', answerSchema)