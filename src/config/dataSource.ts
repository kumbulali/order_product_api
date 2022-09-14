import { DataSource } from "typeorm";
import { Order } from "../entities/order.entity";
import { Product } from "../entities/product.entity";
import { ProductToOrder } from "../entities/productToOrder.entity";
import { User } from "../entities/user.entity";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  entities: [User, Order, Product, ProductToOrder],
  synchronize: true,
  logging: false,
});
