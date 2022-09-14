"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const checkJwt_1 = require("../middlewares/checkJwt");
const productRoutes = (0, express_1.Router)();
productRoutes.post("/", [checkJwt_1.checkJwt], product_controller_1.default.createProductController);
productRoutes.get("/", [checkJwt_1.checkJwt], product_controller_1.default.getAllProductsController);
productRoutes.get("/:id", [checkJwt_1.checkJwt], product_controller_1.default.getProductByIdController);
productRoutes.patch("/:id", [checkJwt_1.checkJwt], product_controller_1.default.updateProductController);
productRoutes.delete("/:id", [checkJwt_1.checkJwt], product_controller_1.default.deleteProductController);
exports.default = productRoutes;
