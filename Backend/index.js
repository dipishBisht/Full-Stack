const express = require('express');
const connect = require("./connetion");
const formRoute = require("./routes/form");

const app = express();

connect("mongodb://127.0.0.1:27017/miniUsers").then(() => console.log("Connected to Mongo")).catch((err) => console.log(err))

app.use(express.json());

//# Form route middleware
app.use("/form", formRoute)

app.listen(3000, () => console.log('Server Started'));
