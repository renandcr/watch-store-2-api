import { errorMiddleware } from "./middlewares/error.middleware";
import { Request, Response } from "express";
import express from "express";

const app = express();
const port = 3000;
app.use(express.json());
app.use(errorMiddleware);

app.get("/watch_store", (req: Request, res: Response) => {
  res.send("Api Watch Store 2 rodando!");
});

app.listen(port, () => {
  console.log(`Api running on port ${port}!`);
});
