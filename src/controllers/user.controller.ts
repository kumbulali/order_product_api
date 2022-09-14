import UserService from "../services/user.service";
import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";

class UserController {
  static createUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    UserService.createUser(body, (err: any, results: any) => {
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
  };
  static getAllUsersController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    UserService.getAllUsers((err: any, results: any) => {
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
  };
  static getUserByEmailController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const email = req.params.email;
    UserService.getUserByEmail(email, (err: any, results: any) => {
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
      if (results == null) {
        return res.status(200).json({
          success: 1,
          message: "This user does not exists.",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  };
  static getUserByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    UserService.getUserById(parseInt(id), (err: any, results: any) => {
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
      if (results == null) {
        return res.status(200).json({
          success: 1,
          message: "This user does not exists.",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  };

  static deleteUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    UserService.deleteUser(parseInt(id), (err: any, results: any) => {
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
  };

  static updateUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const body = req.body;
    UserService.updateUser(parseInt(id), body, (err: any, results: any) => {
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
  };
}

export default UserController;
