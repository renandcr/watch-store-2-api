import { ICartParams } from "../../interfaces/cart.interface";
import ProductCart from "../../entities/productCart.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";
import Cart from "../../entities/cart.entity";
import { formatPrices } from "../../methods";

const removeProductFromCartService = async (
  data: ICartParams
): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user = users.find((user) => user.id === data.user_id);

  if (!user) throw new AppError(404, "[4004] User not found");

  const productCartRepository = AppDataSource.getRepository(ProductCart);

  let productFound = false;
  for (let current in user.cart.productCart) {
    if (user.cart.productCart[current].product.id === data.product_id) {
      productFound = true;
      await productCartRepository.remove(user.cart.productCart[current]);
      break;
    }
  }

  if (!productFound) throw new AppError(404, "[4007] Product not found");

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

  let numberOfInstallments = 1;
  let installmentValue = 0;

  if (cart!.productCart.length < 1) {
    cart!.shipping = 0;
    cart!.installment = "Em 1x de 0 sem juros";
  } else {
    cart!.shipping = cart!.shipping;
    numberOfInstallments = Number(cart!.installment.split("")[3]);
    installmentValue = (cart!.shipping + cart!.amount) / numberOfInstallments;
    cart!.installment = `Em ${numberOfInstallments}x de ${formatPrices(
      installmentValue
    )} sem juros`;
  }

  await cartRepository.save(cart!);
};

export default removeProductFromCartService;
