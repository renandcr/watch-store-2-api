import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

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
}

export default Product;
