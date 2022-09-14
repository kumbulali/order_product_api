import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from "../controllers/product.controller";

const productRoutes = Router();

productRoutes.post("/", createProductController);
productRoutes.get("/", getAllProductsController);
productRoutes.get("/:id", getProductByIdController);
productRoutes.patch("/:id", updateProductController);
productRoutes.delete("/:id", deleteProductController);

export default productRoutes;
