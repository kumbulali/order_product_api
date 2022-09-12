"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductController = exports.deleteProductController = exports.getProductByProductnameController = exports.getProductByIdController = exports.getAllProductsController = exports.createProductController = void 0;
const products_service_1 = require("../services/products.service");
function createProductController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        (0, products_service_1.createProduct)(body, (err, results) => {
            if (err != null) {
                if (err.code == 23502) {
                    return res.status(400).json({
                        success: 0,
                        message: `${err.column} field can not be empty.`,
                    });
                }
                if (err.code == "ECONNREFUSED") {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error occured.",
                    });
                }
                return res.status(500).json({
                    success: 0,
                    message: err.message,
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    });
}
exports.createProductController = createProductController;
function getAllProductsController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        (0, products_service_1.getAllProducts)((err, results) => {
            if (err != null) {
                if (err.code == "ECONNREFUSED") {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error occured.",
                    });
                }
                return res.status(500).json({
                    success: 0,
                    message: err.message,
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    });
}
exports.getAllProductsController = getAllProductsController;
function getProductByIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        (0, products_service_1.getProductById)(parseInt(id), (err, results) => {
            if (err != null) {
                if (err.code == 23502) {
                    return res.status(400).json({
                        success: 0,
                        message: `${err.column} field can not be empty.`,
                    });
                }
                if (err.code == "ECONNREFUSED") {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error occured.",
                    });
                }
                return res.status(500).json({
                    success: 0,
                    message: err.message,
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    });
}
exports.getProductByIdController = getProductByIdController;
function getProductByProductnameController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const productname = req.params.productname;
        (0, products_service_1.getProductByProductname)(productname, (err, results) => {
            if (err != null) {
                if (err.code == 23502) {
                    return res.status(400).json({
                        success: 0,
                        message: `${err.column} field can not be empty.`,
                    });
                }
                if (err.code == "ECONNREFUSED") {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error occured.",
                    });
                }
                return res.status(500).json({
                    success: 0,
                    message: err.message,
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    });
}
exports.getProductByProductnameController = getProductByProductnameController;
function deleteProductController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        (0, products_service_1.deleteProduct)(parseInt(id), (err, results) => {
            if (err != null) {
                if (err.code == 23502) {
                    return res.status(400).json({
                        success: 0,
                        message: `${err.column} field can not be empty.`,
                    });
                }
                if (err.code == "ECONNREFUSED") {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error occured.",
                    });
                }
                if (results != null) {
                    return res.status(500).json({
                        success: 0,
                        message: results,
                    });
                }
                return res.status(500).json({
                    success: 0,
                    message: err.message,
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    });
}
exports.deleteProductController = deleteProductController;
function updateProductController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const body = req.body;
        (0, products_service_1.updateProduct)(parseInt(id), body, (err, results) => {
            if (err != null) {
                if (err.code == 23502) {
                    return res.status(400).json({
                        success: 0,
                        message: `${err.column} field can not be empty.`,
                    });
                }
                if (err.code == "ECONNREFUSED") {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error occured.",
                    });
                }
                return res.status(500).json({
                    success: 0,
                    message: err.message,
                });
            }
            return res.status(200).json({
                success: 1,
                data: results.raw,
            });
        });
    });
}
exports.updateProductController = updateProductController;
