const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const db = require("./config/mongoose");

app.use(express.urlencoded());

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use("/", require("./routes/"));

app.listen(port, () => { console.log("Server runnging this port:", port) });