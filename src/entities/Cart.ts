import {
  Entity,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  total: number;

  @Column()
  quantity: number;

  @ManyToOne((type) => Product, (order) => order.id)
  @JoinColumn()
  item: Product;

  @ManyToOne((type) => User, (user) => user.username)
  @JoinColumn()
  user: User;
}
