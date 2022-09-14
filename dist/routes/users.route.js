"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const checkJwt_1 = require("../middlewares/checkJwt");
const userRoutes = (0, express_1.Router)();
userRoutes.post("/", [checkJwt_1.checkJwt], user_controller_1.default.createUserController);
userRoutes.get("/", [checkJwt_1.checkJwt], user_controller_1.default.getAllUsersController);
userRoutes.get("/id/:id", [checkJwt_1.checkJwt], user_controller_1.default.getUserByIdController);
userRoutes.get("/email/:email", [checkJwt_1.checkJwt], user_controller_1.default.getUserByEmailController);
userRoutes.patch("/:id", [checkJwt_1.checkJwt], user_controller_1.default.updateUserController);
userRoutes.delete("/:id", [checkJwt_1.checkJwt], user_controller_1.default.deleteUserController);
exports.default = userRoutes;
