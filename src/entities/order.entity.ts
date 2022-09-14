import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./product.entity";
import { ProductToOrder } from "./productToOrder.entity";
import { User } from "./user.entity";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.orders)
  @JoinColumn()
  user: User;

  @OneToMany(() => ProductToOrder, (productToOrder) => productToOrder.product)
  productToOrder: ProductToOrder[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
