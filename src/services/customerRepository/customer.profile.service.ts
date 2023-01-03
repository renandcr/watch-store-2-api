import Customer from "../../entities/customer.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { API_URL } from "../../app";

import {
  ICustomerReturn,
  ICustomerId,
} from "../../interfaces/customer.interface";

const customerProfileService = async ({
  customer_id,
}: ICustomerId): Promise<ICustomerReturn> => {
  const customerRepository = AppDataSource.getRepository(Customer);
  const customers = await customerRepository.find();
  const customer: ICustomerReturn | undefined = customers.find(
    (customer) => customer.id === customer_id
  );

  if (!customer) throw new AppError(404, "[4004] Customer not found");

  if (customer.cart.productCart.length > 0) {
    for (let current in customer.cart.productCart) {
      customer.cart.productCart[
        current
      ].product.img = `${API_URL}/watch_store/product/${customer.cart.productCart[current].product.img}`;
    }
  }

  if (customer.purchaseOrders.length > 0) {
    for (let order in customer.purchaseOrders) {
      for (let item in customer.purchaseOrders[order].products) {
        customer.purchaseOrders[order].products[
          item
        ].product.img = `${API_URL}/watch_store/product/${customer.purchaseOrders[order].products[item].product.img}`;
      }
    }
  }

  delete customer.password;

  return customer;
};

export default customerProfileService;
