const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    category_name: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

const category = mongoose.model('category', categorySchema);

module.exports = category;