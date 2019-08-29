const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title required']
    },
    content: {
        type: String,
        required: [true, 'Question content required']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    tags: [{
        type: String
    }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
