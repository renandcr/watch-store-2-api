import { IUserId } from "../../interfaces/user.interface";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";
import Cart from "../../entities/cart.entity";

const userDeleteService = async ({ user_id }: IUserId): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find({
    relations: {
      cart: true,
    },
  });
  const user = users.find((user) => user.id === user_id);

  if (!user) throw new AppError(404, "[4004] User not found");

  await userRepository.remove(user);

  const cartRepository = AppDataSource.getRepository(Cart);
  await cartRepository.remove(user.cart);
};

export default userDeleteService;
