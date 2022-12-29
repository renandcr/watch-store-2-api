import {
  ICustomerReturn,
  ICustomerUpdate,
} from "../../interfaces/customer.interface";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import Customer from "../../entities/customer.entity";
import bcrypt from "bcrypt";

const customerUpdateServices = async (
  data: ICustomerUpdate
): Promise<ICustomerReturn> => {
  const customerRepository = AppDataSource.getRepository(Customer);
  const customers = await customerRepository.find();
  const customer: ICustomerReturn | undefined = customers.find(
    (customer) => customer.id === data.customer_id
  );

  if (!customer) throw new AppError(404, "[4004] Customer not found");

  customer.name = data.name;
  customer.last_name = data.last_name;
  customer.email = data.email;
  customer.admin = data.admin;
  data.password
    ? (customer.password = bcrypt.hashSync(data.password, 8))
    : (customer.password = customer.password);
  customer.created_at = customer.created_at;
  customer.updated_at = new Date();

  await customerRepository.save(customer);
  delete customer.password;

  return customer;
};

export default customerUpdateServices;
