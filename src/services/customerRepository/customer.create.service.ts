import {
  ICustomer,
  ICustomerReturn,
} from "../../interfaces/customer.interface";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import Customer from "../../entities/customer.entity";
import Cart from "../../entities/cart.entity";
import bcrypt from "bcrypt";

const createCustomerService = async (
  data: ICustomer
): Promise<ICustomerReturn> => {
  if (!data.email)
    throw new AppError(406, "[4001] Check if the name of the keys is correct");
  const customerRepository = AppDataSource.getRepository(Customer);
  const verifyCustomer = await customerRepository.findOneBy({
    email: data.email,
  });

  if (verifyCustomer) throw new AppError(409, "[4009] Email already exists");

  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = new Cart();
  cart.total_units = 0;
  cart.amount = 0;
  cart.installment = "Em 1x de 0 sem juros";
  cart.shipping = 0;

  await cartRepository.save(cart);

  const customer: ICustomerReturn = new Customer();
  customer.name = data.name;
  customer.last_name = data.last_name;
  customer.email = data.email;
  customer.admin = data.admin;
  customer.password = bcrypt.hashSync(data.password, 8);
  customer.created_at = new Date();
  customer.updated_at = new Date();
  customer.cart = cart;

  await customerRepository.save(customer);
  delete customer.password;

  return customer;
};

export default createCustomerService;
