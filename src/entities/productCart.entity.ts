import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import Product from "./product.entity";
import Cart from "./cart.entity";

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
}

export default ProductCart;
