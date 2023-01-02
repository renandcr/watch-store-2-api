import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import Customer from "./customer.entity";
import Product from "./product.entity";
import Cart from "./cart.entity";

@Entity()
class ProductCart {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({ type: "integer", default: 1 })
  public units!: number;

  @Column({ type: "float" })
  public final_price!: number;

  @ManyToOne(() => Product, {
    eager: true,
  })
  public product!: Product;

  @ManyToOne(() => Cart, (cart) => cart.productCart)
  public cart!: Cart;

  @ManyToOne(() => Customer, (customer) => customer.productCart, {
    onDelete: "CASCADE",
  })
  public customer!: Customer;
}

export default ProductCart;
