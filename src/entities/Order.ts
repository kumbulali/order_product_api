import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./Product";

@Entity("orders")
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  user_id: number;

  @OneToMany((type) => Product, (item) => item.product_id)
  items: Product[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
