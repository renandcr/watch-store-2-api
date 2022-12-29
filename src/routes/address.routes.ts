import verifyCustomerAuthentication from "../middlewares/verifyCustomerAuthentication.middleware";
import AddressController from "../controller/address.controller";
import { Router } from "express";

const addressRouter = () => {
  const router = Router();
  router.post(
    "/create/:customer_id",
    verifyCustomerAuthentication,
    AddressController.create
  );
  router.patch(
    "/update/:id",
    verifyCustomerAuthentication,
    AddressController.update
  );
  router.delete(
    "/delete/:id",
    verifyCustomerAuthentication,
    AddressController.delete
  );

  return router;
};

export default addressRouter;
