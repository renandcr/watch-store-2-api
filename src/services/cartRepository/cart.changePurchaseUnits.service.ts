import { ICartChangeUnits } from "../../interfaces/cart.interface";
import ProductCart from "../../entities/productCart.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";
import Cart from "../../entities/cart.entity";

const changePurchaseUnitsService = async (
  data: ICartChangeUnits
): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user = users.find((user) => user.id === data.user_id);

  if (!user) throw new AppError(404, "[4004] User not found");

  const productCart = user.cart.productCart.find((current) => {
    return current.id === data.productCart_id;
  });

  if (!productCart) {
    throw new AppError(404, "[4007] Product not found");
  } else {
    if (data.change_units.change_type === "cart_change") {
      productCart.units += data.change_units.units;
    } else productCart.units = data.change_units.units;

    if (productCart.units < 1) productCart.units = 1;

    const productCartRepository = AppDataSource.getRepository(ProductCart);
    await productCartRepository.save(productCart);

    user.cart.total_units = user.cart.productCart.reduce(
      (acc, current) => current.units + acc,
      0
    );

    user.cart.amount = Number(
      user.cart.productCart
        .reduce(
          (acc, current) => current.product.price * current.units + acc,
          0
        )
        .toFixed(2)
    );

    const cartRepository = AppDataSource.getRepository(Cart);
    await cartRepository.save(user.cart);
  }
};

export default changePurchaseUnitsService;
