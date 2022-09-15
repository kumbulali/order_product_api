import { DataSource } from "typeorm";
import { database } from "./config";

export const dataSource = new DataSource({
  type: "postgres",
  host: database.host,
  port: database.port,
  username: database.username,
  password: database.password,
  database: database.name,
  entities: [__dirname + "/../**/*.entity.js"],
  synchronize: true,
});
