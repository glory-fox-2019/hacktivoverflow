const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    upVote: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    downVote: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }]
}, {
    timestamps: true,
    versionKey: false
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question