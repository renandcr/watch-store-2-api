import verifyUserAuthentication from "../middlewares/verifyUserAuthentication.middleware";
import CartController from "../controller/cart.controller";
import { Router } from "express";

const cartRouter = () => {
  const router = Router();
  router.post(
    "/add/:user_id",
    verifyUserAuthentication,
    CartController.addProduct
  );
  router.delete(
    "/remove/:user_id/:product_id",
    verifyUserAuthentication,
    CartController.removeProduct
  );
  router.patch(
    "/change_units/:user_id/:productCart_id",
    verifyUserAuthentication,
    CartController.changePurchaseUnits
  );

  return router;
};

export default cartRouter;
