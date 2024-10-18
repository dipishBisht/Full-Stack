require("dotenv").config();
const express = require('express');
const cors = require("cors")
const connect = require("./connetion");
const formRoute = require("./routes/form");
const DB_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: "https://mini-project-frontend-snowy.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))
app.use(express.json());

connect(DB_URL)

//# Form route middleware
app.use("/form", formRoute)

app.listen(PORT, () => console.log('Server Started'));
