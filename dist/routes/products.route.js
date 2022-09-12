"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const productRoutes = (0, express_1.Router)();
productRoutes.post("/", products_controller_1.createProductController);
productRoutes.get("/", products_controller_1.getAllProductsController);
productRoutes.get("/:id", products_controller_1.getProductByIdController);
productRoutes.patch("/:id", products_controller_1.updateProductController);
productRoutes.delete("/:id", products_controller_1.deleteProductController);
exports.default = productRoutes;
