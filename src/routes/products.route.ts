import { Router } from "express";
import ProductController from "../controllers/product.controller";

const productRoutes = Router();

productRoutes.post("/", ProductController.createProductController);
productRoutes.get("/", ProductController.getAllProductsController);
productRoutes.get("/:id", ProductController.getProductByIdController);
productRoutes.patch("/:id", ProductController.updateProductController);
productRoutes.delete("/:id", ProductController.deleteProductController);

export default productRoutes;
