import addressRouter from "./address.routes";
import userRouter from "./user.routes";
import { Express } from "express";

const appRoutes = (app: Express) => {
  app.use("/watch_store", userRouter());
  app.use("/watch_store/address", addressRouter());
};

export default appRoutes;
