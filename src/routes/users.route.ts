import { Router } from "express";
import UserController from "../controllers/user.controller";
import { checkJwt } from "../middlewares/checkJwt";

const userRoutes = Router();

userRoutes.post("/", [checkJwt], UserController.createUserController);
userRoutes.get("/", [checkJwt], UserController.getAllUsersController);
userRoutes.get("/id/:id", [checkJwt], UserController.getUserByIdController);
userRoutes.get(
  "/email/:email",
  [checkJwt],
  UserController.getUserByEmailController
);
userRoutes.patch("/:id", [checkJwt], UserController.updateUserController);
userRoutes.delete("/:id", [checkJwt], UserController.deleteUserController);

export default userRoutes;
