import removeProductFromCart from "../services/cartRepository/cart.removeProductFromCart.service";
import changePurchaseUnits from "../services/cartRepository/changePurchaseUnits.service";
import addProductToCart from "../services/cartRepository/cart.addProductToCart.service";
import { Request, Response } from "express";

class CartController {
  static async addProduct(req: Request, res: Response) {
    const { user_id, product_id } = req.params;
    await addProductToCart({ user_id, product_id });

    return res.json({ message: "Product added to cart successfully" });
  }

  static async removeProduct(req: Request, res: Response) {
    const { user_id, product_id } = req.params;
    await removeProductFromCart({ user_id, product_id });

    return res.json({ message: "Product removed from cart successfully" });
  }

  static async changePurchaseUnits(req: Request, res: Response) {
    const { user_id, product_id } = req.params;
    const { units } = req.body;
    await changePurchaseUnits({ user_id, product_id, units });

    return res.json({ message: "Product units changed successfully" });
  }
}

export default CartController;
