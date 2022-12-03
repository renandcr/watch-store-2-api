import verifyUserAuthentication from "../middlewares/verifyUserAuthentication.middleware";
import PurchaseOrderController from "../controller/purchaseOrder.controller";
import { Router } from "express";

const purchaseOrderRouter = () => {
  const router = Router();
  router.post(
    "/:user_id",
    verifyUserAuthentication,
    PurchaseOrderController.create
  );

  return router;
};

export default purchaseOrderRouter;
