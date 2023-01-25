import ProductCart from "../../entities/productCart.entity";
import { ICart } from "../../interfaces/cart.interface";
import Customer from "../../entities/customer.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import Cart from "../../entities/cart.entity";
import { formatPrices } from "../../methods";

const addProductToCartService = async (data: ICart): Promise<void> => {
  const customerRepository = AppDataSource.getRepository(Customer);
  const customers = await customerRepository.find();
  const customer = customers.find(
    (customer) => customer.id === data.customer_id
  );

  if (!customer) throw new AppError(404, "[4004] Customer not found");

  const possibleRepeatProduct = customer.cart.productCart.filter((current) => {
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

  customer.cart.total_units += productList.reduce(
    (acc, current) => current.units + acc,
    0
  );

  customer.cart.amount += Number(
    productList
      .reduce((acc, current) => current.final_price * current.units + acc, 0)
      .toFixed(2)
  );

  customer.cart.shipping = 28.9;

  const numberOfInstallments = Number(
    customer.cart.installment.split(" ")[1].replace("x", "")
  );
  const installmentValue =
    (customer.cart.shipping + customer.cart.amount) / numberOfInstallments;

  customer.cart.installment = `Em ${numberOfInstallments}x de ${formatPrices(
    installmentValue
  )} sem juros`;

  const cartRepository = AppDataSource.getRepository(Cart);
  await cartRepository.save(customer.cart);

  const productCartRepository = AppDataSource.getRepository(ProductCart);
  for (let product in productList) {
    const productCart = new ProductCart();
    productCart.cart = customer.cart;
    productCart.customer = customer;
    productCart.product = productList[product].product;
    productCart.units = productList[product].units;
    productCart.final_price = productList[product].final_price;

    await productCartRepository.save(productCart);
  }
};

export default addProductToCartService;
