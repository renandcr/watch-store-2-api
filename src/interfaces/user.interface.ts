import Address from "../entities/address.entity";
import Cart from "../entities/cart.entity";

export interface IUser {
  name: string;
  last_name: string;
  email: string;
  admin: boolean;
  password: string;
}

export interface IUserUpdate extends IUser {
  id: string;
}

export interface IUserReturn {
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
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserId {
  id: string;
}
