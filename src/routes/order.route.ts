import { Router } from "express";
import {
  createOrderController,
  deleteOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderController,
  getAllOrdersOfUserIdController,
} from "../controllers/order.controller";

const orderRoutes = Router();

orderRoutes.post("/", createOrderController);
orderRoutes.get("/", getAllOrdersController);
orderRoutes.get("/:id", getOrderByIdController);
orderRoutes.get("/user/:user_id", getAllOrdersOfUserIdController);
orderRoutes.patch("/:id", updateOrderController);
orderRoutes.delete("/:id", deleteOrderController);

export default orderRoutes;
