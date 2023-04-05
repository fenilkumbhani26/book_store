const express = require("express");
const Book = require('../model/book');

const { createBook, updateBook, deleteBook, viewBook, searchBook } = require("../controller/index");

const routes = express.Router();

routes.post("/", Book.uploadBook, createBook);

routes.get("/getBooks", viewBook);

routes.post("/updateBook/:bookId", Book.uploadBook, updateBook);

routes.get("/deleteBook/:bookId", deleteBook);

routes.get("/searching", searchBook);

module.exports = routes;