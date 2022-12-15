import createPurchaseOrderService from "../services/purchaseOrderRepository/purchaseOrder.create.service";
import deletePurchaseOrderService from "../services/purchaseOrderRepository/purchaseOrder.delete.service";
import { Request, Response } from "express";

class PurchaseOrderController {
  static async create(req: Request, res: Response) {
    const { user_id } = req.params;
    const { shipping } = req.body;
    await createPurchaseOrderService({ user_id, shipping });

    return res
      .status(201)
      .json({ message: "Successfully completed purchase order" });
  }

  static async delete(req: Request, res: Response) {
    const { user_id, request_id } = req.params;
    await deletePurchaseOrderService({ user_id, request_id });

    res.json({ message: "Purchase Order deleted successfully" });
  }
}

export default PurchaseOrderController;
