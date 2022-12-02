import { ICartChangeUnits } from "../../interfaces/cart.interface";
import Product from "../../entities/product.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";
import Cart from "../../entities/cart.entity";

const changePurchaseUnits = async ({
  user_id,
  product_id,
  units,
}: ICartChangeUnits): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user = users.find((user) => user.id === user_id);

  if (!user) throw new AppError(404, "User not found");

  const cartRepository = AppDataSource.getRepository(Cart);
  const carts = await cartRepository.find();
  const cart = carts.find((cart) => cart.id === user.cart.id);

  const productRepository = AppDataSource.getRepository(Product);
  //   const products = await productRepository.find();
  //   const product = products.find((product) => product.id === product_id);

  const product = user.cart.products.find(
    (product) => product.id === product_id
  );

  if (!product) throw new AppError(404, "Product not found");

  if (cart) {
    cart.products.find(async (product) => {
      if (product.id === product_id) {
        product.purchase_units = units;

        await productRepository.save(product);
      }
    });

    await cartRepository.save(cart);
  }
};

export default changePurchaseUnits;
