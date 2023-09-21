import express from "express";
import { v4 as uuidv4 } from "uuid";
import {getUsers, createUser, getUser, deleteUser, updateUser } from "../controllers/users.js";

const router = express.Router();

// All routes in here are starting with /users

router.get("/", getUsers);

// Write data in database

router.post("/", createUser);

// Read data from database

router.get("/:id", getUser);

// Delete data from Database

router.delete("/:id", deleteUser);

// Update data in database

router.patch("/:id", updateUser);

export default router;
