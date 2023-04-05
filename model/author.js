const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
    author_name: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

const author = mongoose.model('author', authorSchema);

module.exports = author;