import { IUserId, IUserReturn } from "../../interfaces/user.interface";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";

const userProfileService = async ({
  user_id,
}: IUserId): Promise<IUserReturn> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user: IUserReturn | undefined = users.find(
    (user) => user.id === user_id
  );

  if (!user) throw new AppError(404, "User not found");

  if (user.cart.products.length > 0) {
    for (let product in user.cart.products) {
      user.cart.products[
        product
      ].img = `http://localhost:3333/watch_store/product/${user.cart.products[product].img}`;
    }
  }

  delete user.password;

  return user;
};

export default userProfileService;
