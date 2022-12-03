import removeProductFromCartService from "../services/cartRepository/cart.removeProductFromCart.service";
import addProductToCartService from "../services/cartRepository/cart.addProductToCart.service";
import { Request, Response } from "express";

class CartController {
  static async addProduct(req: Request, res: Response) {
    const { user_id, product_id } = req.params;
    await addProductToCartService({ user_id, product_id });

    return res.json({ message: "Product added to cart successfully" });
  }

  static async removeProduct(req: Request, res: Response) {
    const { user_id, product_id } = req.params;
    await removeProductFromCartService({ user_id, product_id });

    return res.json({ message: "Product removed from cart successfully" });
  }
}

export default CartController;
