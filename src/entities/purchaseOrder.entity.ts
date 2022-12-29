import ProductCart from "./productCart.entity";
import Customer from "./customer.entity";

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

  @Column({ type: "float" })
  shipping: number;

  @Column({ type: "timestamp" })
  created_at: Date;

  @ManyToOne(() => Customer, (customer) => customer.purchaseOrders, {
    onDelete: "CASCADE",
  })
  customer: Customer;

  @ManyToMany(() => ProductCart, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinTable()
  products: ProductCart[];
}

export default PurchaseOrder;
