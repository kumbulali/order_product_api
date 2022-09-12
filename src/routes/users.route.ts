import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  getUserByUsernameController,
  getUserByEmailController,
  updateUserController,
} from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.post("/", createUserController);
userRoutes.get("/", getAllUsersController);
userRoutes.get("/id/:id", getUserByIdController);
userRoutes.get("/username/:username", getUserByUsernameController);
userRoutes.get("/email/:email", getUserByEmailController);
userRoutes.patch("/:id", updateUserController);
userRoutes.delete("/:id", deleteUserController);

export default userRoutes;
