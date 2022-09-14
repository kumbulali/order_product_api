"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const productRoutes = (0, express_1.Router)();
productRoutes.post("/", product_controller_1.default.createProductController);
productRoutes.get("/", product_controller_1.default.getAllProductsController);
productRoutes.get("/:id", product_controller_1.default.getProductByIdController);
productRoutes.patch("/:id", product_controller_1.default.updateProductController);
productRoutes.delete("/:id", product_controller_1.default.deleteProductController);
exports.default = productRoutes;
