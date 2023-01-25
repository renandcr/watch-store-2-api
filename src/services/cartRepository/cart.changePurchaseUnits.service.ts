import { ICartChangeUnits } from "../../interfaces/cart.interface";
import ProductCart from "../../entities/productCart.entity";
import Customer from "../../entities/customer.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import Cart from "../../entities/cart.entity";
import { formatPrices } from "../../methods";

const changePurchaseUnitsService = async (
  data: ICartChangeUnits
): Promise<void> => {
  const customerRepository = AppDataSource.getRepository(Customer);
  const customers = await customerRepository.find();
  const customer = customers.find(
    (customer) => customer.id === data.customer_id
  );

  if (!customer) throw new AppError(404, "[4004] Customer not found");

  const productCart = customer.cart.productCart.find(
    (current) => current.id === data.productCart_id
  );

  let conflictBetweenCarts = false;

  if (!productCart) {
    throw new AppError(404, "[4007] Product not found");
  } else {
    if (data.change_units.change_type === "cart_change") {
      if (
        productCart.product.stock_quantity - productCart.units < 0 ||
        (productCart.product.stock_quantity === 0 &&
          data.change_units.units === -1)
      ) {
        conflictBetweenCarts = true;
        productCart.units = productCart.product.stock_quantity;
      } else productCart.units += data.change_units.units;
    } else productCart.units = data.change_units.units;

    if (productCart.units < 1 && !conflictBetweenCarts) {
      productCart.units = 1;
    } else if (productCart.units > 5 && !customer.admin) {
      throw new AppError(
        400,
        `[4021] Product with limited purchase quantity of ${5} units per customer`
      );
    } else if (productCart.product.stock_quantity - productCart.units < 0) {
      throw new AppError(
        400,
        `[4019] Insufficient stock. ${productCart.product.stock_quantity} units are available for purchase`
      );
    }

    const productCartRepository = AppDataSource.getRepository(ProductCart);
    await productCartRepository.save(productCart);

    customer.cart.total_units = customer.cart.productCart.reduce(
      (acc, current) => current.units + acc,
      0
    );

    customer.cart.amount = Number(
      customer.cart.productCart
        .reduce((acc, current) => current.final_price * current.units + acc, 0)
        .toFixed(2)
    );

    customer.cart.shipping = customer.cart.shipping;

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
  }
};

export default changePurchaseUnitsService;
