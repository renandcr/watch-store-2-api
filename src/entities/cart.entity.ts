import Product from "./product.entity";

import {
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Column,
  Entity,
} from "typeorm";

@Entity()
class Cart {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "integer" })
  total_units: number;

  @Column({ type: "float" })
  amount: number;

  @ManyToMany(() => Product, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinTable()
  products: Product[];
}

export default Cart;
