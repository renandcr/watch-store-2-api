import { ICustomerId } from "../../interfaces/customer.interface";
import Customer from "../../entities/customer.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import Cart from "../../entities/cart.entity";

const customerDeleteService = async ({
  customer_id,
}: ICustomerId): Promise<void> => {
  const customerRepository = AppDataSource.getRepository(Customer);
  const customers = await customerRepository.find({
    relations: {
      cart: true,
    },
  });
  const customer = customers.find((customer) => customer.id === customer_id);

  if (!customer) throw new AppError(404, "[4004] Customer not found");

  await customerRepository.remove(customer);

  const cartRepository = AppDataSource.getRepository(Cart);
  await cartRepository.remove(customer.cart);
};

export default customerDeleteService;
