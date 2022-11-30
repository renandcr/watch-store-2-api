import Product from "./product.entity";
import User from "./user.entity";

import {
  PrimaryGeneratedColumn,
  JoinColumn,
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
  purchase_units: number;

  @JoinColumn()
  user: User;

  @ManyToMany(() => Product, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinTable()
  products: Product[];
}

export default Cart;
