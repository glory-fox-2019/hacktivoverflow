const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const answerSchema = new Schema({
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
    }]
},  {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
