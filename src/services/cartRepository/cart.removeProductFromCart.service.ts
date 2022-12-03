import { ICart } from "../../interfaces/cart.interface";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";
import Cart from "../../entities/cart.entity";

const removeProductFromCartService = async ({
  user_id,
  product_id,
}: ICart): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user = users.find((user) => user.id === user_id);

  if (!user) throw new AppError(404, "User not found");

  const product = user.cart.products.find(
    (product) => product.id === product_id
  );

  if (!product) throw new AppError(404, "Product not found");

  user.cart.products = user.cart.products.filter(
    (product) => product.id !== product_id
  );

  user.cart.total_units = user.cart.products.reduce(
    (acc, product) => product.purchase_units + acc,
    0
  );

  user.cart.amount = user.cart.products.reduce(
    (acc, product) => product.price + acc * product.purchase_units,
    0
  );

  const cartRepository = AppDataSource.getRepository(Cart);
  await cartRepository.save(user.cart);
};

export default removeProductFromCartService;
