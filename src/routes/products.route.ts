import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  getProductByProductnameController,
  updateProductController,
} from "../controllers/products.controller";

const productRoutes = Router();

productRoutes.post("/", createProductController);
productRoutes.get("/", getAllProductsController);
productRoutes.get("/:id", getProductByIdController);
productRoutes.patch("/:id", updateProductController);
productRoutes.delete("/:id", deleteProductController);

export default productRoutes;
