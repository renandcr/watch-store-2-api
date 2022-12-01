import { ICart } from "../../interfaces/cart.interface";
import Product from "../../entities/product.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";
import Cart from "../../entities/cart.entity";

const addProductToCart = async ({ user_id, product_id }: ICart) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user = users.find((user) => user.id === user_id);

  if (!user) throw new AppError(404, "User not found");

  const productRepository = AppDataSource.getRepository(Product);
  const products = await productRepository.find();
  const product = products.find((product) => product.id === product_id);

  if (!product) throw new AppError(404, "Product not found");

  const cartRepository = AppDataSource.getRepository(Cart);
  const carts = await cartRepository.find();
  const cart = carts.find((cart) => cart.id === user.cart.id);

  if (cart) {
    if (cart.products.length > 0) {
      const possibleProduct = cart.products.find(
        (product) => product.id === product_id
      );
      if (possibleProduct)
        throw new AppError(409, "This product is already in the cart");
    }

    cart.products = [...cart.products, product];
    cart.total_units += product.purchase_units;
    cart.amount += product.purchase_units * product.price;

    await cartRepository.save(cart);
  }
};

export default addProductToCart;
