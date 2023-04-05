const Category = require("../model/category");
const Author = require("../model/author");
const Book = require("../model/book");
const path = require("path");
const fs = require("fs");

// Category
module.exports.createCategory = async (req, res) => {
    try {
        let findCategory = await Category.findOne({ category_book_name: req.body.category_name });
        if (findCategory) {
            return res.json({ "message": "category already exists." });
        } else {
            if (req.body.category_name == "") {
                return res.json({ "message": "please enter the category." });
            } else {
                let addCategory = await Category.create(req.body);
                if (!addCategory) {
                    return res.json({ "message": "somthing wrong." });
                }
                return res.status(201).json({ "message": "category created successfully." });
            }
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports.updateCategory = async (req, res) => {
    try {
        let categoryId = req.params.categoryId;
        let data = await Category.findById(categoryId);
        if (data) {
            let data = await Category.findByIdAndUpdate(categoryId, req.body);
            return res.json({ "message": "category updated successfully" });
        } else {
            return res.json({ "message": "category not found" });
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports.deleteCategory = async (req, res) => {
    try {
        let categoryId = req.params.categoryId;
        let data = await Category.findByIdAndDelete(categoryId);
        if (!data) {
            return res.json({ 'msg': "something wrong" });
        }
        return res.json({ 'msg': "category deleted successfully" });
    } catch (error) {
        console.error(error);
    }
}

module.exports.viewCategory = async (req, res) => {
    try {
        let categories = await Category.find();
        return res.json({ "message": "all categories", categories: categories });
    } catch (error) {
        console.error(error);
    }
}

// Author
module.exports.createAuthor = async (req, res) => {
    try {
        let findAuthor = await Author.findOne({ author_name: req.body.author_name });
        if (findAuthor) {
            return res.json({ "message": "author already exists." });
        } else {
            if (req.body.author_name == "") {
                return res.json({ "message": "please enter the author." });
            } else {
                let addAuthor = await Author.create(req.body);
                if (!addAuthor) {
                    return res.json({ "message": "somthing wrong." });
                }
                return res.status(201).json({ "message": "author created successfully." });
            }
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports.updateAuthor = async (req, res) => {
    try {
        let authorId = req.params.authorId;
        let data = await Author.findById(authorId);
        if (data) {
            let data = await Author.findByIdAndUpdate(authorId, req.body);
            return res.json({ "message": "author updated successfully" });
        } else {
            return res.json({ "message": "author not found" });
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports.deleteAuthor = async (req, res) => {
    try {
        let authorId = req.params.authorId;
        let data = await Author.findByIdAndDelete(authorId);
        if (!data) {
            return res.json({ 'msg': "something wrong" });
        }
        return res.json({ 'msg': "author deleted successfully" });
    } catch (error) {
        console.error(error);
    }
}

module.exports.viewAuthor = async (req, res) => {
    try {
        let authors = await Author.find();
        return res.json({ "message": "all authors", authors: authors });
    } catch (error) {
        console.error(error);
    }
}

// Book
module.exports.createBook = async (req, res) => {
    try {
        let findBook = await Book.findOne({ book_name: req.body.book_name });
        if (findBook) {
            return res.json({ "message": "book already exists." });
        } else {
            let bookImage = Book.bookPath + "/" + req.file.filename;
            req.body.bookImage = bookImage;

            let createBook = await Book.create(req.body);
            return res.status(201).json({ "message": "book created successfully." });
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports.updateBook = async (req, res) => {
    try {
        if (req.file) {
            let bookId = req.params.bookId;
            let oldRecord = await Book.findById(bookId);
            let oldImage = oldRecord.bookImage;
            fs.unlinkSync(path.join(__dirname, '..', oldImage));
            let newBookImage = Book.bookPath + "/" + req.file.filename;
            req.body.bookImage = newBookImage;
            let data = await Book.findByIdAndUpdate(bookId, req.body);
            return res.json({ "message": "book updated successfully" });
        } else {
            let bookId = req.params.bookId;
            let data = await Book.findById(bookId);
            if (data) {
                let data = await Book.findByIdAndUpdate(bookId, req.body);
                return res.json({ "message": "book updated successfully" });
            } else {
                return res.json({ "message": "book not found" });
            }
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports.deleteBook = async (req, res) => {
    try {
        let bookId = req.params.bookId;
        let bookRecord = await Book.findById(bookId);
        if (bookRecord) {
            fs.unlinkSync(path.join(__dirname, '..', bookRecord.bookImage));
            let removeBook = await Book.findByIdAndDelete(bookId);
            return res.json({ "message": "book delete successfully", data: removeBook });
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports.viewBook = async (req, res) => {
    try {
        let books = await Book.find();
        return res.json({ "message": "all books", books: books });
    } catch (error) {
        console.error(error);
    }
}

module.exports.searchBook = async (req, res) => {
    let bookName = req.query.book_name
    // sort({ $natural: -1 }) find latest record
    let result = await Book.find({ book_name: { $regex: bookName, $options: "i" } });
    return res.json({ data: result });
}