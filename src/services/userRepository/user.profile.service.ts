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

  if (!user) throw new AppError(404, "[4004] User not found");

  if (user.cart.productCart.length > 0) {
    for (let current in user.cart.productCart) {
      user.cart.productCart[
        current
      ].product.img = `http://localhost:3333/watch_store/product/${user.cart.productCart[current].product.img}`;
    }
  }

  if (user.purchaseOrders.length > 0) {
    for (let order in user.purchaseOrders) {
      for (let item in user.purchaseOrders[order].products) {
        user.purchaseOrders[order].products[
          item
        ].product.img = `http://localhost:3333/watch_store/product/${user.purchaseOrders[order].products[item].product.img}`;
      }
    }
  }

  delete user.password;

  return user;
};

export default userProfileService;
