const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    upVotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downVotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
        timestamps: true,
        versionKey: false
    })


const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer;