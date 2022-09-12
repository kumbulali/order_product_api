import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByProductname,
  deleteProduct,
  updateProduct,
} from "../services/products.service";
import { NextFunction, Request, Response } from "express";
import { UpdateResult } from "typeorm";

export async function createProductController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  createProduct(body, (err: any, results: any) => {
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
export async function getAllProductsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  getAllProducts((err: any, results: any) => {
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

export async function getProductByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  getProductById(parseInt(id), (err: any, results: any) => {
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
export async function getProductByProductnameController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const productname = req.params.productname;
  getProductByProductname(productname, (err: any, results: any) => {
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
export async function deleteProductController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  deleteProduct(parseInt(id), (err: any, results: any) => {
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

export async function updateProductController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  const body = req.body;
  updateProduct(parseInt(id), body, (err: any, results: UpdateResult) => {
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
