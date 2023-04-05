const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/bookStoreDB");

const db = mongoose.connection;

db.once('open', function (err) {
    if (!err) {
        console.log("DB is connected");
    }
});

module.exports = db