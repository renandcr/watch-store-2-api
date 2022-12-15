import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import ProductCart from "./productCart.entity";

@Entity()
class Product {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", length: 150 })
  reference: string;

  @Column()
  img: string;

  @Column({ type: "varchar", length: 150 })
  description: string;

  @Column({ type: "float" })
  price: number;

  @Column({ type: "integer" })
  stock_quantity: number;

  @Column({ type: "varchar", length: 50 })
  category: string;

  @Column({ type: "varchar", length: 50 })
  genre: string;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp" })
  updated_at: Date;

  @OneToMany(() => ProductCart, (productCart) => productCart.product)
  productCart!: ProductCart[];
}

export default Product;
