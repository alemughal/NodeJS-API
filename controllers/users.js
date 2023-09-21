import { v4 as uuidv4 } from "uuid";

let users = [];

// All routes in here are starting with /users

export const getUsers = (req, res) => {
  console.log(users);
  res.send(users);
};

// Write data in database
export const createUser = (req, res) => {
  const user = req.body;

  const userId = uuidv4();

  const userWithId = { ...user, id: userId };

  users.push(userWithId);

  res.send(`User with the name ${user.firstName} added to the database!}`);
};

// Read data from database

export const getUser = (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  res.send(foundUser);
};

// Delete data from Database

export const deleteUser = (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id);

  res.send(`Users with the id ${id} deleted from the database.`);
};

// Update data in database

export const updateUser = (req, res) => {
  const { id } = req.params;

  const { firstName, lastName, age } = req.body;

  const user = users.find((user) => user.id === id);

  if (firstName) user.firstName = firstName;

  if (lastName) user.lastName = lastName;

  if (age) user.age = age;

  res.send(`User with the id ${id} has been updated.`);
};
