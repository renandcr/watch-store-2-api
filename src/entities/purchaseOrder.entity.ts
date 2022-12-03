import Product from "./product.entity";
import User from "./user.entity";

import {
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  Column,
  Entity,
} from "typeorm";

@Entity()
class PurchaseOrder {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "integer" })
  purchase_units: number;

  @Column({ type: "float" })
  total_price: number;

  @ManyToOne(() => User, (user) => user.purchaseOrders)
  user: User;

  @ManyToMany(() => Product, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinTable()
  products: Product[];
}

export default PurchaseOrder;
