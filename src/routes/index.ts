import addressRouter from "./address.routes";
import productRouter from "./product.routes";
import userRouter from "./user.routes";
import { Express } from "express";

const appRoutes = (app: Express) => {
  app.use("/watch_store", userRouter());
  app.use("/watch_store/address", addressRouter());
  app.use("/watch_store/product", productRouter());
};

export default appRoutes;
