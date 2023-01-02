import verifyCustomerAuthentication from "../middlewares/verifyCustomerAuthentication.middleware";
import typeCheckerMiddleware from "../middlewares/typeChecker.middleware";
import CustomerController from "../controller/customer.controller";
import { Router } from "express";

const customerRouter = () => {
  const router = Router();
  router.post("/create", typeCheckerMiddleware, CustomerController.create);
  router.post("/login", typeCheckerMiddleware, CustomerController.login);
  router.get("/", verifyCustomerAuthentication, CustomerController.list);
  router.get(
    "/:customer_id",
    verifyCustomerAuthentication,
    CustomerController.profile
  );
  router.patch(
    "/update/:customer_id",
    typeCheckerMiddleware,
    verifyCustomerAuthentication,
    CustomerController.update
  );
  router.delete(
    "/delete/:customer_id",
    verifyCustomerAuthentication,
    CustomerController.delete
  );

  return router;
};

export default customerRouter;
