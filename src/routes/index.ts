import userRouter from "./user.routes";
import { Express } from "express";

const appRoutes = (app: Express) => {
  app.use("/watch_store", userRouter());
};

export default appRoutes;
