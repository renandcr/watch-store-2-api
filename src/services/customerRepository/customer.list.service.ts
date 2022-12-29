import { ICustomerReturn } from "../../interfaces/customer.interface";
import { AppDataSource } from "../../data-source";
import Customer from "../../entities/customer.entity";

const customerListService = async (): Promise<Array<ICustomerReturn>> => {
  const customerRepository = AppDataSource.getRepository(Customer);
  const customers: Array<ICustomerReturn> = await customerRepository.find();
  for (let customer in customers) {
    delete customers[customer].password;
  }

  return customers;
};

export default customerListService;
