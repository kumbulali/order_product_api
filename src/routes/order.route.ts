import { Router } from "express";
import OrderController from "../controllers/order.controller";
import { UserRole } from "../entities/user.entity";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const orderRoutes = Router();

orderRoutes.post(
  "/",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.CUSTOMER])],
  OrderController.createOrderController
);
orderRoutes.get(
  "/",
  [checkJwt, checkRole([UserRole.ADMIN])],
  OrderController.getAllOrdersController
);
orderRoutes.get(
  "/:id",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.CUSTOMER])],
  OrderController.getOrderByIdController
);
orderRoutes.get(
  "/user/:user_id",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.CUSTOMER])],
  OrderController.getAllOrdersOfUserIdController
);
orderRoutes.patch(
  "/:id",
  [checkJwt, checkRole([UserRole.ADMIN])],
  OrderController.updateOrderController
);
orderRoutes.delete(
  "/:id",
  [checkJwt, checkRole([UserRole.ADMIN])],
  OrderController.deleteOrderController
);

export default orderRoutes;
