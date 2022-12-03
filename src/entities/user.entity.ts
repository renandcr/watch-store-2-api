import PurchaseOrder from "./purchaseOrder.entity";
import Address from "./address.entity";
import Cart from "./cart.entity";

import {
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  OneToOne,
  Column,
  Entity,
} from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  last_name: string;

  @Column({ type: "varchar", length: 75 })
  email: string;

  @Column({ type: "boolean", default: false })
  admin: boolean;

  @Column({ type: "varchar", length: 100 })
  password: string;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp" })
  updated_at: Date;

  @OneToOne(() => Cart, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  cart: Cart;

  @OneToMany(() => Address, (address) => address.user, {
    eager: true,
  })
  addresses: Address[];

  @OneToMany(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.user, {
    eager: true,
  })
  purchaseOrders: PurchaseOrder[];
}

export default User;
