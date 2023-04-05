const express = require("express");

const routes = express.Router();

routes.use("/category", require("./category"));
routes.use("/author", require("./author"));
routes.use("/book", require("./book"));

module.exports = routes;