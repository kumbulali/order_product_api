import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
} from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity()
export class ProductToOrder extends BaseEntity {
  @PrimaryGeneratedColumn()
  productToOrderId: number;

  @ManyToOne(() => Product, (product) => product.productToOrder)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Order, (order) => order.productToOrder)
  @JoinColumn()
  order: Order;

  @Column()
  quantity: number;
}
