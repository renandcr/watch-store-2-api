import { ICart } from "../../interfaces/cart.interface";
import Product from "../../entities/product.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";
import Cart from "../../entities/cart.entity";

const addProductToCartService = async ({
  user_id,
  product_id,
}: ICart): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user = users.find((user) => user.id === user_id);

  if (!user) throw new AppError(404, "User not found");

  const productRepository = AppDataSource.getRepository(Product);
  const products = await productRepository.find();
  const product = products.find((product) => product.id === product_id);

  if (!product) throw new AppError(404, "Product not found");

  if (user.cart.products.length > 0) {
    const possibleProduct = user.cart.products.find(
      (product) => product.id === product_id
    );
    if (possibleProduct)
      throw new AppError(409, "This product is already in the cart");
  }

  user.cart.products = [...user.cart.products, product];
  user.cart.total_units += product.purchase_units;
  user.cart.amount += product.purchase_units * product.price;

  const cartRepository = AppDataSource.getRepository(Cart);
  await cartRepository.save(user.cart);
};

export default addProductToCartService;
