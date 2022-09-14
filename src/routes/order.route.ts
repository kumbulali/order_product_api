import { Router } from "express";
import OrderController from "../controllers/order.controller";

const orderRoutes = Router();

orderRoutes.post("/", OrderController.createOrderController);
orderRoutes.get("/", OrderController.getAllOrdersController);
orderRoutes.get("/:id", OrderController.getOrderByIdController);
orderRoutes.get(
  "/user/:user_id",
  OrderController.getAllOrdersOfUserIdController
);
orderRoutes.patch("/:id", OrderController.updateOrderController);
orderRoutes.delete("/:id", OrderController.deleteOrderController);

export default orderRoutes;
