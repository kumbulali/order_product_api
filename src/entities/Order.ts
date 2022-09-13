import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @OneToMany((type) => Product, (item) => item.id)
  items: Product[];

  @OneToOne((type) => User, (user) => user.username)
  @JoinColumn()
  user: User;

  @Column()
  subTotal: number;

  @Column({ default: false })
  pending: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
