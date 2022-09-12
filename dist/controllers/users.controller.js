"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserController = exports.deleteUserController = exports.getUserByUsernameController = exports.getUserByIdController = exports.getUserByEmailController = exports.getAllUsersController = exports.createUserController = void 0;
const users_service_1 = require("../services/users.service");
function createUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        (0, users_service_1.createUser)(body, (err, results) => {
            if (err != null) {
                if (err.code == 23505) {
                    return res.status(400).json({
                        success: 0,
                        message: "This email is already exists.",
                    });
                }
                if (err.code == 23502) {
                    return res.status(400).json({
                        success: 0,
                        message: `${err.column} field can not be empty.`,
                    });
                }
                if (err.code == "ECONNREFUSED") {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error occured.",
                    });
                }
                return res.status(500).json({
                    success: 0,
                    message: err.message,
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    });
}
exports.createUserController = createUserController;
function getAllUsersController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        (0, users_service_1.getAllUsers)((err, results) => {
            if (err != null) {
                if (err.code == "ECONNREFUSED") {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error occured.",
                    });
                }
                return res.status(500).json({
                    success: 0,
                    message: err.message,
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    });
}
exports.getAllUsersController = getAllUsersController;
function getUserByEmailController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = req.params.email;
        (0, users_service_1.getUserByEmail)(email, (err, results) => {
            if (err != null) {
                if (err.code == 23505) {
                    return res.status(400).json({
                        success: 0,
                        message: "This email is already exists.",
                    });
                }
                if (err.code == 23502) {
                    return res.status(400).json({
                        success: 0,
                        message: `${err.column} field can not be empty.`,
                    });
                }
                if (err.code == "ECONNREFUSED") {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error occured.",
                    });
                }
                return res.status(500).json({
                    success: 0,
                    message: err.message,
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    });
}
exports.getUserByEmailController = getUserByEmailController;
function getUserByIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        (0, users_service_1.getUserById)(parseInt(id), (err, results) => {
            if (err != null) {
                if (err.code == 23505) {
                    return res.status(400).json({
                        success: 0,
                        message: "This email is already exists.",
                    });
                }
                if (err.code == 23502) {
                    return res.status(400).json({
                        success: 0,
                        message: `${err.column} field can not be empty.`,
                    });
                }
                if (err.code == "ECONNREFUSED") {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error occured.",
                    });
                }
                return res.status(500).json({
                    success: 0,
                    message: err.message,
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    });
}
exports.getUserByIdController = getUserByIdController;
function getUserByUsernameController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.params.username;
        (0, users_service_1.getUserByUsername)(username, (err, results) => {
            if (err != null) {
                if (err.code == 23505) {
                    return res.status(400).json({
                        success: 0,
                        message: "This email is already exists.",
                    });
                }
                if (err.code == 23502) {
                    return res.status(400).json({
                        success: 0,
                        message: `${err.column} field can not be empty.`,
                    });
                }
                if (err.code == "ECONNREFUSED") {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error occured.",
                    });
                }
                return res.status(500).json({
                    success: 0,
                    message: err.message,
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    });
}
exports.getUserByUsernameController = getUserByUsernameController;
function deleteUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        (0, users_service_1.deleteUser)(parseInt(id), (err, results) => {
            if (err != null) {
                if (err.code == 23505) {
                    return res.status(400).json({
                        success: 0,
                        message: "This email is already exists.",
                    });
                }
                if (err.code == 23502) {
                    return res.status(400).json({
                        success: 0,
                        message: `${err.column} field can not be empty.`,
                    });
                }
                if (err.code == "ECONNREFUSED") {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error occured.",
                    });
                }
                return res.status(500).json({
                    success: 0,
                    message: err.message,
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    });
}
exports.deleteUserController = deleteUserController;
function updateUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const body = req.body;
        (0, users_service_1.updateUser)(parseInt(id), body, (err, results) => {
            if (err != null) {
                if (err.code == 23505) {
                    return res.status(400).json({
                        success: 0,
                        message: "This email is already exists.",
                    });
                }
                if (err.code == 23502) {
                    return res.status(400).json({
                        success: 0,
                        message: `${err.column} field can not be empty.`,
                    });
                }
                if (err.code == "ECONNREFUSED") {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error occured.",
                    });
                }
                return res.status(500).json({
                    success: 0,
                    message: err.message,
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    });
}
exports.updateUserController = updateUserController;
