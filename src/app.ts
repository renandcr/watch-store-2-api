import { errorMiddleware } from "./middlewares/error.middleware";
import { Request, Response } from "express";
import appRoutes from "./routes";
import express from "express";
import "express-async-errors";
const cors = require("cors");
require("dotenv").config();

const app = express();
export const PORT = process.env.PORT || 3333;
export const WEBSITE_URL =
  process.env.NODE_ENV === "production"
    ? "https://watchstore2.vercel.app"
    : "https://watch-store-design-git-developer-renandcr.vercel.app";

app.use("/watch_store/product", express.static("src/uploads"));
app.use(cors());
app.use(express.json());
appRoutes(app);
app.use(errorMiddleware);

app.get("/", (_: Request, res: Response) => {
  res.send("Hello Watch Store!");
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
