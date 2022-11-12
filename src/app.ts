import { errorMiddleware } from "./middlewares/error.middleware";
import { Request, Response } from "express";
import appRoutes from "./routes";
import express from "express";
import "express-async-errors";
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const port = 3333;
appRoutes(app);
app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Api Watch Store 2 running!");
});

app.listen(port, () => {
  console.log(`Api running on port ${port}!`);
});
