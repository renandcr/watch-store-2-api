import Product from "../entities/product.entity";

export interface ICart {
  customer_id: string;
  add_products: {
    request_type: string;
    products: Array<{ units: number; final_price: number; product: Product }>;
  };
}

export interface ICartParams {
  customer_id: string;
  product_id: string;
}

export interface ICartChangeUnits {
  customer_id: string;
  productCart_id: string;
  change_units: { change_type: string; units: number };
}

export interface ICartChangeInstallments {
  installment: number;
  customer_id: string;
}
