const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        slug: { type: String, required: true },
        detail: { type: String, required: true },
        description: { type: String },
        image: { type: String, required: true },
        type: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
