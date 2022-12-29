import PurchaseOrder from "../entities/purchaseOrder.entity";
import Address from "../entities/address.entity";
import Cart from "../entities/cart.entity";

export interface ICustomer {
  name: string;
  last_name: string;
  email: string;
  admin: boolean;
  password: string;
}

export interface ICustomerUpdate extends ICustomer {
  customer_id: string;
}

export interface ICustomerReturn {
  id: string;
  name: string;
  last_name: string;
  email: string;
  admin: boolean;
  password?: string;
  created_at: Date;
  updated_at: Date;
  addresses: Array<Address>;
  cart: Cart;
  purchaseOrders: Array<PurchaseOrder>;
}

export interface ICustomerLogin {
  email: string;
  password: string;
}

export interface ICustomerId {
  customer_id: string;
}
