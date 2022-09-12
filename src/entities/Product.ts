import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  product_name: string;

  @Column({ nullable: true })
  amount: number;

  @Column()
  price: number;
}
