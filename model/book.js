const mongoose = require("mongoose");
const book_path = "/uploads/books";
const multer = require("multer");
const path = require("path");

const bookSchema = mongoose.Schema({
    category_name: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    author_name: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    book_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    new_price: {
        type: String,
        required: true
    },
    old_price: {
        type: String,
        required: true
    },
    bookImage: {
        type: String,
        required: true
    }
    // ,
    // release_time: {
    //     type: String,
    //     required: true
    // }
}, {
    timestamps: true,
    versionKey: false
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', book_path));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
})

bookSchema.statics.uploadBook = multer({ storage: storage }).single("bookImage");
bookSchema.statics.bookPath = book_path;

const book = mongoose.model('book', bookSchema);

module.exports = book;