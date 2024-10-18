require("dotenv").config();
const express = require('express');
const connect = require("./connetion");
const formRoute = require("./routes/form");
const DB_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;

const app = express();

connect(DB_URL)

app.use(express.json());

//# Form route middleware
app.use("/form", formRoute)

app.listen(PORT, () => console.log('Server Started'));
