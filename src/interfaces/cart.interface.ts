import Product from "../entities/product.entity";
import Cart from "../entities/cart.entity";
import User from "../entities/user.entity";

export interface ICart {
  user_id: string;
  add_products: {
    request_type: string;
    products: Array<{ units: number; product: Product }>;
  };
}

export interface ICartParams {
  user_id: string;
  product_id: string;
}

export interface ICartChangeUnits {
  user_id: string;
  productCart_id: string;
  change_units: { change_type: string; units: number };
}

export interface IProductCart {
  units: number;
  product: Product;
  cart: Cart;
  user: User;
}
