import { DataSource } from "typeorm";
require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PWD,
  username: process.env.POSTGRES_USER,

  synchronize: false,
  logging: true,
  entities: ["./src/entities/*.ts"],
  migrations: ["./src/migrations/*.ts"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source Initialized");
  })
  .catch((err) =>
    console.error("Error during Data Source Initialization", err)
  );
