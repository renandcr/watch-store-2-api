import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import User from "./user.entity";

@Entity()
class Address {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", length: 150 })
  street: string;

  @Column({ type: "varchar", length: 150 })
  district: string;

  @Column({ type: "varchar", length: 100 })
  city: string;

  @Column({ type: "varchar", length: 2 })
  state: string;

  @Column({ type: "varchar", length: 8 })
  zip_code: string;

  @Column({ type: "varchar", length: 14 })
  phone: string;

  @Column("timestamp")
  created_at: Date;

  @Column("timestamp")
  updated_at: Date;

  @ManyToOne((type) => User, (user) => user.addresses, {
    onDelete: "CASCADE",
  })
  user: User;
}

export default Address;
