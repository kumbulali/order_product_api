"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("../entities/order.entity");
const product_entity_1 = require("../entities/product.entity");
const productToOrder_entity_1 = require("../entities/productToOrder.entity");
const user_entity_1 = require("../entities/user.entity");
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    entities: [user_entity_1.User, order_entity_1.Order, product_entity_1.Product, productToOrder_entity_1.ProductToOrder],
    synchronize: true,
    logging: false,
});
