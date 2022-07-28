const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        textContent: {
            type: String,
            required: [true, 'Please provide text content'],
            maxlength: 256,
        },
        author: {
            type: String,
            required: [true, 'Please provide author name (5 to 20 characters)'],
            maxlength: 20,
            minlength: 5,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user'],
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema)
