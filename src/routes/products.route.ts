import { Router } from "express";
import ProductController from "../controllers/product.controller";
import { checkJwt } from "../middlewares/checkJwt";

const productRoutes = Router();

productRoutes.post("/", [checkJwt], ProductController.createProductController);
productRoutes.get("/", [checkJwt], ProductController.getAllProductsController);
productRoutes.get(
  "/:id",
  [checkJwt],
  ProductController.getProductByIdController
);
productRoutes.patch(
  "/:id",
  [checkJwt],
  ProductController.updateProductController
);
productRoutes.delete(
  "/:id",
  [checkJwt],
  ProductController.deleteProductController
);

export default productRoutes;
