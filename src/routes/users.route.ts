import { Router } from "express";
import UserController from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.post("/", UserController.createUserController);
userRoutes.get("/", UserController.getAllUsersController);
userRoutes.get("/id/:id", UserController.getUserByIdController);
userRoutes.get("/email/:email", UserController.getUserByEmailController);
userRoutes.patch("/:id", UserController.updateUserController);
userRoutes.delete("/:id", UserController.deleteUserController);

export default userRoutes;
