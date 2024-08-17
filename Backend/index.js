const express = require('express');
const connect = require("./connetion")
const UserModel = require("./models/allUsers");

const app = express();

connect("mongodb://127.0.0.1:27017/miniUsers").then(() => console.log("Connected to Mongo")).catch((err) => console.log(err))

app.use(express.json());

app.get('/form/api/users', async (req, res) => {
  const usersData = await UserModel.find();
  res.status(200).send(usersData);
});

app.post('/form/signUpData', async (req, res) => {
  const body = req.body;
  if (body && body.firstName && body.lastName && body.age && body.email) {
    const data = await UserModel.create(body);
    if (!data) return res.status(500).json({ status: "error", message: "Unexpected Error" })
    return res.status(201).json({ status: "success", message: "User Created", user: data })
  } else {
    return res.status(400).json({ status: "error", message: "Bad Request" })
  }
});

app.delete('/form/deleteData', async (req, res) => {
  const { _id: id } = req.body;
  if (!id)
    return res.status(500).json({ status: "error", message: "Unexpected Error" })

  const response = await UserModel.findByIdAndDelete(id);
  if (!response) return res.status(400).json({ status: "error", message: "No user found" })

  return res.status(200).json({ status: "success", message: "User deleted successfully", response })
});

app.put("/form/updateUser", async (req, res) => {
  const body = req.body;

  const response = await UserModel.findByIdAndUpdate(body._id, body, { new: true });
  if (!response) return res.status(400).json({ status: "error", message: "Invalid Id" });
  return res.status(200).json({ status: "success", message: "User updated successfully", user: response });
})

app.listen(3000, () => console.log('Server Started'));
