import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  searchUser,
  updateUser,
  userError,
} from "../controller/userController.js";

export const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserById);
usersRouter.get("/search", searchUser);
usersRouter.post("", createUser);
usersRouter.delete("/:id", deleteUser);
usersRouter.put("/:id", updateUser);
usersRouter.get("/error", userError);
