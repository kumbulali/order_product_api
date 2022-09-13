import { DataSource } from "typeorm";
import { Cart } from "../entities/Cart";
import { Order } from "../entities/Order";
import { Product } from "../entities/Product";
import { User } from "../entities/User";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  entities: [User, Order, Product, Cart],
  synchronize: true,
  logging: false,
});
