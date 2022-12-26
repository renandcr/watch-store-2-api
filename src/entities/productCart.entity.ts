import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import Product from "./product.entity";
import Cart from "./cart.entity";
import User from "./user.entity";

@Entity()
class ProductCart {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({ type: "integer", default: 1 })
  public units!: number;

  @ManyToOne(() => Product, (product) => product.productCart, {
    eager: true,
  })
  public product!: Product;

  @ManyToOne(() => Cart, (cart) => cart.productCart)
  public cart!: Cart;

  @ManyToOne(() => User, (user) => user.productCart, {
    onDelete: "CASCADE",
  })
  public user!: User;
}

export default ProductCart;
