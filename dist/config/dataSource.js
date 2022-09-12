"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const Order_1 = require("../entities/Order");
const Product_1 = require("../entities/Product");
const User_1 = require("../entities/User");
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    entities: [User_1.User, Order_1.Order, Product_1.Product],
    synchronize: true,
    logging: false,
});
