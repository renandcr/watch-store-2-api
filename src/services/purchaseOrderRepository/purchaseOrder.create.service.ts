import { IPurchaseOrderCreate } from "../../interfaces/purchaseOrder.interface";
import PurchaseOrder from "../../entities/purchaseOrder.entity";
import ProductCart from "../../entities/productCart.entity";
import Product from "../../entities/product.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";
import Cart from "../../entities/cart.entity";

const createPurchaseOrderService = async (
  data: IPurchaseOrderCreate
): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user = users.find((user) => user.id === data.user_id);

  if (!user) throw new AppError(404, "[4004] User not found");

  const cartRepository = AppDataSource.getRepository(Cart);

  if (!user.cart.productCart.length) {
    throw new AppError(406, "[4014] Empty cart");
  } else if (!user.addresses.length) {
    throw new AppError(406, "[4015] No registered delivery address");
  } else {
    let mainAddress = false;
    for (let current in user.addresses) {
      if (user.addresses[current].main) {
        mainAddress = true;
        break;
      }
    }
    if (!mainAddress) {
      throw new AppError(406, "[4023] You must indicate a delivery address");
    }
  }

  for (let current in user.cart.productCart) {
    if (user.cart.productCart[current].product.stock_quantity < 1) {
      throw new AppError(400, "[4020] Product sold out in cart.");
    }
  }

  const newPurchaseOrder = new PurchaseOrder();
  newPurchaseOrder.user = user;
  newPurchaseOrder.products = user.cart.productCart;
  newPurchaseOrder.shipping = data.shipping;
  newPurchaseOrder.total_price = user.cart.amount + data.shipping;
  newPurchaseOrder.purchase_units = user.cart.total_units;
  newPurchaseOrder.created_at = new Date();

  const purchaseOrderRepository = AppDataSource.getRepository(PurchaseOrder);
  await purchaseOrderRepository.save(newPurchaseOrder);

  const productRepository = AppDataSource.getRepository(Product);
  const products = await productRepository.find();
  for (let current in user.cart.productCart) {
    for (let item in products) {
      if (user.cart.productCart[current].product.id === products[item].id) {
        products[item].stock_quantity -= user.cart.productCart[current].units;
        await productRepository.save(products[item]);
      }
    }
  }

  user.cart.productCart = [];
  user.cart.amount = 0;
  user.cart.total_units = 0;

  await cartRepository.save(user.cart);

  const productCartRepository = AppDataSource.getRepository(ProductCart);
  await productCartRepository.save(user.cart.productCart);
};

export default createPurchaseOrderService;
