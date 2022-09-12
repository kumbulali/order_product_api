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
exports.deleteProduct = exports.updateProduct = exports.getProductByProductname = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const dataSource_1 = require("../config/dataSource");
const Product_1 = require("../entities/Product");
function createProduct(data, callBack) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var product = new Product_1.Product();
            product.product_name = data.product_name;
            product.amount = data.amount;
            product.price = data.price;
            //product.role = data.role | undefined;
            yield dataSource_1.dataSource.manager.save(product);
            return callBack(null, product);
        }
        catch (error) {
            console.log(error);
            return callBack(error);
        }
    });
}
exports.createProduct = createProduct;
function getAllProducts(callBack) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield Product_1.Product.find();
            return callBack(null, products);
        }
        catch (error) {
            console.log(error);
            return callBack(error);
        }
    });
}
exports.getAllProducts = getAllProducts;
function getProductById(id, callBack) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield Product_1.Product.findOneBy({ product_id: id });
            return callBack(null, product);
        }
        catch (error) {
            console.log(error);
            return callBack(error);
        }
    });
}
exports.getProductById = getProductById;
function getProductByProductname(product_name, callBack) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield Product_1.Product.findOneBy({ product_name: product_name });
            return callBack(null, product);
        }
        catch (error) {
            console.log(error);
            return callBack(error);
        }
    });
}
exports.getProductByProductname = getProductByProductname;
function updateProduct(id, data, callBack) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield dataSource_1.dataSource
                .createQueryBuilder()
                .update(Product_1.Product)
                .set({
                product_name: data.product_name,
                amount: data.amount,
                price: data.price,
            })
                .where("product_id = :product_id", { product_id: id })
                .execute();
            return callBack(null, product);
        }
        catch (error) {
            console.log(error);
            return callBack(error);
        }
    });
}
exports.updateProduct = updateProduct;
function deleteProduct(id, callBack) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield dataSource_1.dataSource
                .createQueryBuilder()
                .delete()
                .from(Product_1.Product)
                .where("product_id = :product_id", { product_id: id })
                .execute();
            if (result.affected == 0) {
                return callBack("error", "An error occured when deleting.");
            }
            return callBack(null, "Successfully deleted.");
            return callBack(null, result);
        }
        catch (error) {
            console.log(error);
            callBack(error);
        }
    });
}
exports.deleteProduct = deleteProduct;
