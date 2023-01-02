import { DataSource } from "typeorm";
require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url:
    process.env.NODE_ENV === "production"
      ? process.env.DATABASE_URL
      : process.env.DATABASE_DEV_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,

  synchronize: false,
  logging: true,

  entities:
    process.env.NODE_ENV === "production"
      ? ["dist/entities/*.js"]
      : ["src/entities/*.ts"],

  migrations:
    process.env.NODE_ENV === "production"
      ? ["dist/migrations/*.js"]
      : ["src/migrations/*.ts"],
});

AppDataSource.initialize()
  .then(() => console.log("Data source initialized"))
  .catch((err) =>
    console.error("Error during Data Source initialization", err)
  );
