import {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  updateOrder,
  getAllOrdersOfUserId,
} from "../services/order.service";
import { NextFunction, Request, Response } from "express";
import { UpdateResult } from "typeorm";

export async function createOrderController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  createOrder(body, (err: any, results: any) => {
    if (err != null) {
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
export async function getAllOrdersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  getAllOrders((err: any, results: any) => {
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

export async function getOrderByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  getOrderById(parseInt(id), (err: any, results: any) => {
    if (err != null) {
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
export async function getAllOrdersOfUserIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user_id = req.params.user_id;
  getAllOrdersOfUserId(parseInt(user_id), (err: any, results: any) => {
    if (err != null) {
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

export async function updateOrderController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  const body = req.body;
  updateOrder(parseInt(id), body, (err: any, results: UpdateResult) => {
    if (err != null) {
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
      if (results != null) {
        return res.status(500).json({
          success: 0,
          message: "An error occured while updating order info.",
        });
      }
      return res.status(500).json({
        success: 0,
        message: err.message,
      });
    }
    return res.status(200).json({
      success: 1,
      message: "Order successfully updated.",
    });
  });
}

export async function deleteOrderController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  deleteOrder(parseInt(id), (err: any, results: any) => {
    if (err != null) {
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
      if (results != null) {
        return res.status(500).json({
          success: 0,
          message: results,
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
