import {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  deleteUser,
  updateUser,
} from "../services/user.service";
import { NextFunction, Request, Response } from "express";

export async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  createUser(body, (err: any, results: any) => {
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
}
export async function getAllUsersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  getAllUsers((err: any, results: any) => {
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
}
export async function getUserByEmailController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const email = req.params.email;
  getUserByEmail(email, (err: any, results: any) => {
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
}
export async function getUserByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  getUserById(parseInt(id), (err: any, results: any) => {
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
}
export async function getUserByUsernameController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const username = req.params.username;
  getUserByUsername(username, (err: any, results: any) => {
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
}
export async function deleteUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  deleteUser(parseInt(id), (err: any, results: any) => {
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
}

export async function updateUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  const body = req.body;
  updateUser(parseInt(id), body, (err: any, results: any) => {
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
}
