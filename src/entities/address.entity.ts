import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import Customer from "./customer.entity";

@Entity()
class Address {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", length: 50 })
  street: string;

  @Column({ type: "varchar", length: 50 })
  district: string;

  @Column({ type: "varchar", length: 10 })
  house_number: string;

  @Column({ type: "varchar", length: 50, default: null })
  complement: string;

  @Column({ type: "varchar", length: 50 })
  city: string;

  @Column({ type: "varchar", length: 2 })
  state: string;

  @Column({ type: "varchar", length: 8 })
  zip_code: string;

  @Column({ type: "varchar", length: 14 })
  phone: string;

  @Column({ type: "boolean", default: false })
  main: boolean;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp" })
  updated_at: Date;

  @ManyToOne(() => Customer, (customer) => customer.addresses, {
    onDelete: "CASCADE",
  })
  customer: Customer;
}

export default Address;
