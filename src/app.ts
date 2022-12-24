import { errorMiddleware } from "./middlewares/error.middleware";
import { Request, Response } from "express";
import appRoutes from "./routes";
import express from "express";
import "express-async-errors";
const cors = require("cors");

const app = express();
const port = 3333;

app.use("/watch_store/product", express.static("src/uploads"));
app.use(cors());
app.use(express.json());
appRoutes(app);
app.use(errorMiddleware);

app.get("/", (_: Request, res: Response) => {
  res.send("Hello Watch Store!");
});

app.listen(process.env.PORT || port, () => {
  console.log(`Api running in development or production.`);
});
