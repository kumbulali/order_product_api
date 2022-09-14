import { Router } from "express";
import ProductController from "../controllers/product.controller";
import { UserRole } from "../entities/user.entity";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const productRoutes = Router();

productRoutes.post(
  "/",
  [checkJwt, checkRole([UserRole.ADMIN])],
  ProductController.createProductController
);
productRoutes.get(
  "/",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.CUSTOMER])],
  ProductController.getAllProductsController
);
productRoutes.get(
  "/:id",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.CUSTOMER])],
  ProductController.getProductByIdController
);
productRoutes.patch(
  "/:id",
  [checkJwt, checkRole([UserRole.ADMIN])],
  ProductController.updateProductController
);
productRoutes.delete(
  "/:id",
  [checkJwt, checkRole([UserRole.ADMIN])],
  ProductController.deleteProductController
);

export default productRoutes;
