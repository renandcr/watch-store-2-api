import { ICartChangeInstallments } from "../../interfaces/cart.interface";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";
import Cart from "../../entities/cart.entity";

const changeInstallmentsService = async (data: ICartChangeInstallments) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user = users.find((user) => user.id === data.user_id);

  if (!user) throw new AppError(404, "[4004] User not found");

  user.cart.installment = data.installment;

  const cartRepository = AppDataSource.getRepository(Cart);

  await cartRepository.save(user.cart);
};

export default changeInstallmentsService;
