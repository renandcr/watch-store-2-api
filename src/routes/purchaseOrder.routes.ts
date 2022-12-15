import verifyUserAuthentication from "../middlewares/verifyUserAuthentication.middleware";
import PurchaseOrderController from "../controller/purchaseOrder.controller";
import { Router } from "express";

const purchaseOrderRouter = () => {
  const router = Router();
  router.post(
    "/create/:user_id",
    verifyUserAuthentication,
    PurchaseOrderController.create
  );
  router.delete(
    "/delete/:user_id/:request_id",
    verifyUserAuthentication,
    PurchaseOrderController.delete
  );

  return router;
};

export default purchaseOrderRouter;
