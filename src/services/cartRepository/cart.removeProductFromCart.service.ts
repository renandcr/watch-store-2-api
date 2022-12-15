import { ICartParams } from "../../interfaces/cart.interface";
import ProductCart from "../../entities/productCart.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";
import Cart from "../../entities/cart.entity";

const removeProductFromCartService = async (
  data: ICartParams
): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user = users.find((user) => user.id === data.user_id);

  if (!user) throw new AppError(404, "[4004] User not found");

  const product = user.cart.productCart.find(
    (current) => current.product.id === data.product_id
  );

  if (!product) throw new AppError(404, "[4007] Product not found");

  const productCartRepository = AppDataSource.getRepository(ProductCart);

  for (let current in user.cart.productCart) {
    if (user.cart.productCart[current].product.id === data.product_id) {
      await productCartRepository.remove(user.cart.productCart[current]);
      break;
    }
  }

  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = await cartRepository.findOne({ where: { id: user.cart.id } });

  cart!.total_units = cart!.productCart.reduce(
    (acc, current) => current.units + acc,
    0
  );

  cart!.amount = Number(
    cart!.productCart
      .reduce((acc, current) => current.product.price * current.units + acc, 0)
      .toFixed(2)
  );

  await cartRepository.save(cart!);
};

export default removeProductFromCartService;
