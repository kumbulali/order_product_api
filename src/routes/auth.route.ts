import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { checkJwt } from "../middlewares/checkJwt";

const authRoutes = Router();
//Login route
authRoutes.post("/login", AuthController.login);

//Register route
authRoutes.post("/register", AuthController.register);

//Change my password
authRoutes.post("/change-password", [checkJwt], AuthController.changePassword);

export default authRoutes;
