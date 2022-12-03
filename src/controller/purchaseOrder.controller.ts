import createPurchaseOrderService from "../services/purchaseOrderRepository/purchaseOrder.create.service";
import { Request, Response } from "express";

class PurchaseOrderController {
  static async create(req: Request, res: Response) {
    const { user_id } = req.params;
    await createPurchaseOrderService({ user_id });

    return res
      .status(201)
      .json({ message: "Successfully completed purchase order" });
  }
}

export default PurchaseOrderController;
