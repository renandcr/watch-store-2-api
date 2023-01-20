import verifyCustomerAuthentication from "../middlewares/verifyCustomerAuthentication.middleware";
import CartController from "../controller/cart.controller";
import { Router } from "express";

const cartRouter = () => {
  const router = Router();
  router.post(
    "/add/:customer_id",
    verifyCustomerAuthentication,
    CartController.addProduct
  );
  router.delete(
    "/remove/:customer_id/:product_id",
    verifyCustomerAuthentication,
    CartController.removeProduct
  );
  router.patch(
    "/change_units/:customer_id/:productCart_id",
    verifyCustomerAuthentication,
    CartController.changePurchaseUnits
  );

  router.patch(
    "/change_installments/:customer_id",
    verifyCustomerAuthentication,
    CartController.changeInstallments
  );

  return router;
};

export default cartRouter;
