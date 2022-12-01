import { ICart } from "../../interfaces/cart.interface";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";
import Cart from "../../entities/cart.entity";

const removeProductFromCart = async ({
  user_id,
  product_id,
}: ICart): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user = users.find((user) => user.id === user_id);

  if (!user) throw new AppError(404, "User not found");

  const cartRepository = AppDataSource.getRepository(Cart);
  const carts = await cartRepository.find();
  const cart = carts.find((cart) => cart.id === user.cart.id);

  const product = user.cart.products.find(
    (product) => product.id === product_id
  );

  if (!product) throw new AppError(404, "Product not found");

  if (cart) {
    cart.products = cart.products.filter(
      (product) => product.id !== product_id
    );

    cart.total_units = cart.products.reduce(
      (acc, product) => product.purchase_units + acc,
      0
    );

    cart.amount = cart.products.reduce(
      (acc, product) => product.price + acc * product.purchase_units,
      0
    );

    await cartRepository.save(cart);
  }
};

export default removeProductFromCart;
