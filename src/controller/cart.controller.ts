import removeProductFromCartService from "../services/cartRepository/cart.removeProductFromCart.service";
import changePurchaseUnitsService from "../services/cartRepository/cart.changePurchaseUnits.service";
import changeInstallmentsService from "../services/cartRepository/cart.changeInstallments.service";
import addProductToCartService from "../services/cartRepository/cart.addProductToCart.service";
import { Request, Response } from "express";

class CartController {
  static async addProduct(req: Request, res: Response) {
    const { customer_id } = req.params;
    const { add_products } = req.body;
    await addProductToCartService({ customer_id, add_products });

    return res.json({ message: "Successfully performed operation" });
  }

  static async removeProduct(req: Request, res: Response) {
    const { customer_id, product_id } = req.params;
    await removeProductFromCartService({ customer_id, product_id });

    return res.json({ message: "Product removed from cart successfully" });
  }

  static async changePurchaseUnits(req: Request, res: Response) {
    const { customer_id, productCart_id } = req.params;
    const { change_units } = req.body;
    await changePurchaseUnitsService({
      customer_id,
      productCart_id,
      change_units,
    });

    return res.json({ message: "Product units changed successfully" });
  }

  static async changeInstallments(req: Request, res: Response) {
    const { installment } = req.body;
    const { customer_id } = req.params;

    await changeInstallmentsService({ installment, customer_id });

    return res.json({ message: "Payment condition changed successfully" });
  }
}

export default CartController;
