import ProductCart from "../../entities/productCart.entity";
import { ICart } from "../../interfaces/cart.interface";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";
import Cart from "../../entities/cart.entity";
import { formatPrices } from "../../methods";

const addProductToCartService = async (data: ICart): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user = users.find((user) => user.id === data.user_id);

  if (!user) throw new AppError(404, "[4004] User not found");

  const possibleRepeatProduct = user.cart.productCart.filter((current) => {
    return data.add_products.products.find(
      (item) => current.product.id === item.product.id
    );
  });

  if (
    data.add_products.request_type !== "first_login" &&
    possibleRepeatProduct.length
  ) {
    throw new AppError(409, "[4013] This product is already in the cart");
  }

  const productList = data.add_products.products.filter((current) => {
    let thereIsEqual = false;
    const productFound = possibleRepeatProduct.find((item) => {
      return current.product.id === item.product.id;
    });
    if (productFound) {
      thereIsEqual = true;
    }
    if (!thereIsEqual) {
      return current;
    }
  });

  user.cart.total_units += productList.reduce(
    (acc, current) => current.units + acc,
    0
  );

  user.cart.amount += Number(
    productList
      .reduce((acc, current) => current.product.price * current.units + acc, 0)
      .toFixed(2)
  );

  user.cart.shipping = 28.9;

  const numberOfInstallments = Number(user.cart.installment.split("")[3]);
  const installmentValue =
    (user.cart.shipping + user.cart.amount) / numberOfInstallments;

  user.cart.installment = `Em ${numberOfInstallments}x de ${formatPrices(
    installmentValue
  )} sem juros`;

  const cartRepository = AppDataSource.getRepository(Cart);
  await cartRepository.save(user.cart);

  const productCartRepository = AppDataSource.getRepository(ProductCart);
  for (let product in productList) {
    const productCart = new ProductCart();
    productCart.cart = user.cart;
    productCart.user = user;
    productCart.product = productList[product].product;
    productCart.units = productList[product].units;

    await productCartRepository.save(productCart);
  }
};

export default addProductToCartService;
