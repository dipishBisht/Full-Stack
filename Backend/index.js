const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

app.get('/form/api/users', (req, res) => {
  const usersData = JSON.parse(fs.readFileSync('Database.json', 'utf-8'));
  res.status(200).send(usersData);
});

app.post('/form/signUpData', (req, res) => {
  const body = req.body;
  console.log('Received data:', body);
  const data = JSON.parse(fs.readFileSync('Database.json', 'utf-8'));
  if (!data) {
    fs.writeFile('Database.json', JSON.stringify([{ id: 1, ...body }]), (err) => {
      if (err) res.json({ status: 'error' });
      else res.json({ status: 'success' });
    });
  } else {
    data.push({ id: data.length + 1, ...body });
    fs.writeFile('Database.json', JSON.stringify(data), (err) => {
      if (err) res.json({ status: 'error' });
      else res.json({ status: 'success', message: 'Data added successfully' });
    });
  }
});

app.delete('/form/deleteData', (req, res) => {
  const body = req.body;
  const data = JSON.parse(fs.readFileSync('Database.json', 'utf-8'));
  const newData = data.filter(user => user.id !== body.id);
  fs.writeFile('Database.json', JSON.stringify(newData), (err) => {
    if (err) res.json({ status: 'error' });
    else res.json({ status: 'success', message: 'User deleted successfully' });
  });
});

app.put("/form/updateUser", (req, res) => {
  const body = req.body;
  console.log(body);
  const allUsers = JSON.parse(fs.readFileSync("Database.json", "utf-8"));

  const findedUser = allUsers.findIndex((user) => user.id === body.id)
  if (findedUser === -1) return res.json({ status: error, message: "User Not found" })
  allUsers[findedUser] = body;

  fs.writeFile("Database.json", JSON.stringify(allUsers), (err) => {
    if (err) return res.json({ status: "Error", message: "User not updated" })
    return res.json({ status: "Success", message: "User updated sucessfully" })
  })
})

app.listen(3000, () => console.log('Server Started'));
