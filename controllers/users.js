import { v4 as uuidv4 } from "uuid";

let users = [];

// Validation function to check if a user object is valid
const isValidUser = (user) => {
  return (
    typeof user === "object" &&
    user.hasOwnProperty("firstName") &&
    user.hasOwnProperty("lastName") &&
    user.hasOwnProperty("age") &&
    typeof user.firstName === "string" &&
    typeof user.lastName === "string" &&
    typeof user.age === "number" &&
    user.age >= 0
  );
};

// All routes in here are starting with /users

export const getUsers = (req, res) => {
  console.log(users);
  res.send(users);
};

// Write data in database
export const createUser = (req, res) => {
  const user = req.body;

  // Check if the user data is valid
  if (!isValidUser(user)) {
    return res.status(400).send("Invalid user data");
  }

  const userId = uuidv4();

  const userWithId = { ...user, id: userId };

  users.push(userWithId);

  res.send(`User with the name ${user.firstName} added to the database!`);
};

// Read data from database
export const getUser = (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  if (!foundUser) {
    return res.status(404).send("User not found");
  }

  res.send(foundUser);
};

// Delete data from Database
export const deleteUser = (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).send("User not found");
  }

  users.splice(userIndex, 1);

  res.send(`User with the id ${id} deleted from the database.`);
};

// Update data in database
export const updateUser = (req, res) => {
  const { id } = req.params;

  const { firstName, lastName, age } = req.body;

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).send("User not found");
  }

  // Check and update user properties
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (age) user.age = age;

  res.send(`User with the id ${id} has been updated.`);
};
