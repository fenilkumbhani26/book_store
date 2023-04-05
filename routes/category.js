const express = require("express");

const { createCategory, updateCategory, deleteCategory, viewCategory } = require("../controller/index");

const routes = express.Router();

routes.post("/", createCategory);

routes.get("/getCategories", viewCategory);

routes.post("/updateCategory/:categoryId", updateCategory);

routes.get("/deleteCategory/:categoryId", deleteCategory);

module.exports = routes;