import purchaseOrderRouter from "./purchaseOrder.routes";
import addressRouter from "./address.routes";
import productRouter from "./product.routes";
import userRouter from "./user.routes";
import cartRouter from "./cart.routes";
import { Express } from "express";

const appRoutes = (app: Express) => {
  app.use("/watch_store/purchase-order", purchaseOrderRouter());
  app.use("/watch_store/address", addressRouter());
  app.use("/watch_store/product", productRouter());
  app.use("/watch_store/cart", cartRouter());
  app.use("/watch_store", userRouter());
};

export default appRoutes;
