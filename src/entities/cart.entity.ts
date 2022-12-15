import { PrimaryGeneratedColumn, OneToMany, Column, Entity } from "typeorm";
import ProductCart from "./productCart.entity";

@Entity()
class Cart {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "integer" })
  total_units: number;

  @Column({ type: "float" })
  amount: number;

  @OneToMany(() => ProductCart, (productCart) => productCart.cart, {
    eager: true,
  })
  productCart!: ProductCart[];
}

export default Cart;
