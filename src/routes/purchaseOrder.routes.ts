import verifyCustomerAuthentication from "../middlewares/verifyCustomerAuthentication.middleware";
import PurchaseOrderController from "../controller/purchaseOrder.controller";
import { Router } from "express";

const purchaseOrderRouter = () => {
  const router = Router();
  router.post(
    "/create/:customer_id",
    verifyCustomerAuthentication,
    PurchaseOrderController.create
  );
  router.delete(
    "/delete/:customer_id/:request_id",
    verifyCustomerAuthentication,
    PurchaseOrderController.delete
  );

  return router;
};

export default purchaseOrderRouter;
