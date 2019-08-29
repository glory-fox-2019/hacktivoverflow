const { Schema, model, ObjectId } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please input question title']
    },
    content: {
        type: String,
        required: [true, 'Please input question description']
    },
    upvotes: [{
        type: ObjectId,
        ref: 'User',
    }],
    downvotes: [{
        type: ObjectId,
        ref: 'User',
    }],
    author: { type: ObjectId, ref: 'User'},
    tags: [{
        type: ObjectId,
        ref: 'Tag'
    }]
}, { timestamps: true })

questionSchema.plugin(uniqueValidator)

module.exports = model('Question', questionSchema)