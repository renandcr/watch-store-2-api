import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column("varchar", {
    length: 50,
  })
  name: string;

  @Column("varchar", {
    length: 50,
  })
  last_name: string;

  @Column("varchar", {
    length: 50,
  })
  email: string;

  @Column()
  password: string;

  @Column("timestamp")
  created_at: Date;

  @Column("timestamp")
  updated_at: Date;
}
