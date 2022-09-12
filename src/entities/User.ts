import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Order } from "./Order";

export enum UserRole {
  ADMIN = "admin",
  CUSTOMER = "customer",
}

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @Column({
    unique: true,
  })
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne((type) => Order, (order) => order.order_id)
  @JoinColumn()
  order: Order;
}
