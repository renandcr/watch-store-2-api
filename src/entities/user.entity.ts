import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Address from "./address.entity";

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  last_name: string;

  @Column({ type: "varchar", length: 100 })
  email: string;

  @Column({ type: "boolean", default: false })
  admin: boolean;

  @Column({ type: "varchar" })
  password: string;

  @Column("timestamp")
  created_at: Date;

  @Column("timestamp")
  updated_at: Date;

  @OneToMany((type) => Address, (address) => address.user, {
    eager: true,
  })
  addresses: Address[];
}

export default User;
