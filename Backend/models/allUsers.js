const mongoose = require("mongoose");

const allUsers = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    age: { type: String },
    email: { type: String, unique: true }
}, { timestamps: true })

const UserModel = mongoose.model("allUsers", allUsers);

module.exports = UserModel;