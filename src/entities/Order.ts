import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  user_id: number;

  @OneToMany((type) => Product, (item) => item.product_id)
  items: Product[];
}
