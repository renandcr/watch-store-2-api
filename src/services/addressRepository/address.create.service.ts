import { IAddress } from "../../interfaces/address.interface";
import Customer from "../../entities/customer.entity";
import Address from "../../entities/address.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

const addressCreateService = async (data: IAddress): Promise<void> => {
  const addressRepository = AppDataSource.getRepository(Address);
  const customerRepository = AppDataSource.getRepository(Customer);
  const customers = await customerRepository.find();
  const customer = customers.find(
    (customer) => customer.id === data.customer_id
  );

  if (!customer)
    throw new AppError(
      404,
      "[4005] Customer not found. Address cannot be assigned to a non-existent customer"
    );

  if (customer.addresses.length) {
    for (let current in customer.addresses) {
      customer.addresses[current].main = false;
      await addressRepository.save(customer.addresses[current]);
    }
  }

  const address = new Address();
  address.street = data.street;
  address.district = data.district;
  address.house_number = data.house_number;
  address.complement = data.complement;
  address.city = data.city;
  address.state = data.state.toUpperCase();
  address.zip_code = data.zip_code;
  address.phone = data.phone;
  address.main = true;
  address.created_at = new Date();
  address.updated_at = new Date();
  address.customer = <Customer>customer;

  await addressRepository.save(address);
};

export default addressCreateService;
