const usersController = {};
const path = require('path');
const fsPromises = require('fs/promises');
const { v4 } = require('uuid');
const filePath = path.resolve(__dirname, '../../data/users.json');

usersController.getAllUsers = async (req, res) => {
  try {
    const fileData = await fsPromises.readFile(filePath);
    const users = JSON.parse(fileData);
    res.send(users);
  } catch (error) {
    return res.send('error: ' + error);
  }
};

usersController.createUser = async (req, res) => {
  const newUser = { id: v4(), name: req.body.name, email: req.body.email };
  try {
    const fileData = await fsPromises.readFile(filePath);
    const users = JSON.parse(fileData);

    const updatedUsers = [...users, newUser];
    await fsPromises.writeFile(filePath, JSON.stringify(updatedUsers));

    res.send(updatedUsers);
  } catch (error) {
    return res.send('error: ' + error);
  }
};

usersController.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const fileData = await fsPromises.readFile(filePath);
    const users = JSON.parse(fileData);

    const userToUpdate = users.findIndex((user) => user.userId === id);
    userToUpdate.name = req.body.name;
    userToUpdate.email = req.body.email;

    await fsPromises.writeFile(filePath, JSON.stringify(users));
    res.send(users);
  } catch (error) {
    return res.send('error: ' + error);
  }
};

usersController.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const fileData = await fsPromises.readFile(filePath);
    const users = JSON.parse(fileData);

    const userIndex = users.findIndex((user) => user.userId === id);
    users.splice(userIndex, 1);
    await fsPromises.writeFile(filePath, JSON.stringify(users));
    res.send(users);
  } catch (error) {
    return res.send('error: ' + error);
  }
};

module.exports = usersController;