const express = require("express");

const router = express.Router();
const { deleteUser, getUsersData, signUpUser, updateUser } = require("../controller/form")


router.get('/api/users', getUsersData);

router.post('/signUpData', signUpUser);

router.delete('/deleteData', deleteUser);

router.put("/updateUser", updateUser)

module.exports = form;