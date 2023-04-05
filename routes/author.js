const express = require("express");

const { createAuthor, updateAuthor, deleteAuthor, viewAuthor } = require("../controller/index");

const routes = express.Router();

routes.post("/", createAuthor);

routes.get("/getAuthors", viewAuthor);

routes.post("/updateAuthor/:authorId", updateAuthor);

routes.get("/deleteAuthor/:authorId", deleteAuthor);

module.exports = routes;