import removeProductFromCartService from "../services/cartRepository/cart.removeProductFromCart.service";
import changePurchaseUnitsService from "../services/cartRepository/cart.changePurchaseUnits.service";
import addProductToCartService from "../services/cartRepository/cart.addProductToCart.service";
import { Request, Response } from "express";

class CartController {
  static async addProduct(req: Request, res: Response) {
    const { user_id } = req.params;
    const { add_products } = req.body;
    await addProductToCartService({ user_id, add_products });

    return res.json({ message: "Successfully performed operation" });
  }

  static async removeProduct(req: Request, res: Response) {
    const { user_id, product_id } = req.params;
    await removeProductFromCartService({ user_id, product_id });

    return res.json({ message: "Product removed from cart successfully" });
  }

  static async changePurchaseUnits(req: Request, res: Response) {
    const { user_id, productCart_id } = req.params;
    const { change_units } = req.body;
    await changePurchaseUnitsService({ user_id, productCart_id, change_units });

    return res.json({ message: "Product units changed successfully" });
  }
}

export default CartController;
