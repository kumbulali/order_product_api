import { Router } from "express";
import UserController from "../controllers/user.controller";
import { UserRole } from "../entities/user.entity";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const userRoutes = Router();

userRoutes.post(
  "/",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.CUSTOMER])],
  UserController.createUserController
);
userRoutes.get(
  "/",
  [checkJwt, checkRole([UserRole.ADMIN])],
  UserController.getAllUsersController
);
userRoutes.get(
  "/id/:id",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.CUSTOMER])],
  UserController.getUserByIdController
);
userRoutes.get(
  "/email/:email",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.CUSTOMER])],
  UserController.getUserByEmailController
);
userRoutes.patch(
  "/:id",
  [checkJwt, checkRole([UserRole.ADMIN])],
  UserController.updateUserController
);
userRoutes.delete(
  "/:id",
  [checkJwt, checkRole([UserRole.ADMIN])],
  UserController.deleteUserController
);

export default userRoutes;
