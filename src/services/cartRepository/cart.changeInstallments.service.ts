import { ICartChangeInstallments } from "../../interfaces/cart.interface";
import Customer from "../../entities/customer.entity";
import { formatPrices } from "../../methods/index";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import Cart from "../../entities/cart.entity";

const changeInstallmentsService = async (data: ICartChangeInstallments) => {
  const customerRepository = AppDataSource.getRepository(Customer);
  const customers = await customerRepository.find();
  const customer = customers.find(
    (customer) => customer.id === data.customer_id
  );

  if (!customer) throw new AppError(404, "[4004] Customer not found");

  const totalPrice = customer.cart.amount + customer.cart.shipping;
  const installment = `Em ${data.installment}x de R$ ${formatPrices(
    totalPrice / data.installment
  )} sem juros`;

  customer.cart.installment = installment;

  const cartRepository = AppDataSource.getRepository(Cart);

  await cartRepository.save(customer.cart);
};

export default changeInstallmentsService;
