import verifyUserAuthentication from "../middlewares/verifyUserAuthentication.middleware";
import CartController from "../controller/cart.controller";
import { Router } from "express";

const cartRouter = () => {
  const router = Router();
  router.post(
    "/add/:user_id/:product_id",
    verifyUserAuthentication,
    CartController.addProduct
  );
  router.post(
    "/remove/:user_id/:product_id",
    verifyUserAuthentication,
    CartController.removeProduct
  );

  return router;
};

export default cartRouter;
