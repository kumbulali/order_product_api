import OrderService from "../services/order.service";
import { NextFunction, Request, Response } from "express";
import { UpdateResult } from "typeorm";

class OrderController {
  static createOrderController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    OrderService.createOrder(body, (err: any, results: any) => {
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
  };
  static getAllOrdersController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    OrderService.getAllOrders((err: any, results: any) => {
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

  static getOrderByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    OrderService.getOrderById(parseInt(id), (err: any, results: any) => {
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
  };
  static getAllOrdersOfUserIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user_id = req.params.user_id;
    OrderService.getAllOrdersOfUserId(
      parseInt(user_id),
      (err: any, results: any) => {
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
      }
    );
  };

  static updateOrderController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const body = req.body;
    OrderService.updateOrder(
      parseInt(id),
      body,
      (err: any, results: UpdateResult) => {
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
      }
    );
  };

  static deleteOrderController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    OrderService.deleteOrder(parseInt(id), (err: any, results: any) => {
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
  };
}
export default OrderController;
