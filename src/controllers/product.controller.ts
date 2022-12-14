import { NextFunction, Request, Response } from "express";
import { UpdateResult } from "typeorm";
import ProductService from "../services/product.service";

class ProductController {
  static createProductController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    ProductService.createProduct(body, (err: any, results: any) => {
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
  static getAllProductsController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    ProductService.getAllProducts((err: any, results: any) => {
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

  static getProductByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    ProductService.getProductById(parseInt(id), (err: any, results: any) => {
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
  static deleteProductController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    ProductService.deleteProduct(parseInt(id), (err: any, results: any) => {
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

  static updateProductController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const body = req.body;
    ProductService.updateProduct(
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
              message: "An error occured while updating product info.",
            });
          }
          return res.status(500).json({
            success: 0,
            message: err.message,
          });
        }
        return res.status(200).json({
          success: 1,
          message: "Product successfully updated.",
        });
      }
    );
  };
}

export default ProductController;
