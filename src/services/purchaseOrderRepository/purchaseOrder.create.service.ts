import { IPurchaseOrderCreate } from "../../interfaces/purchaseOrder.interface";
import PurchaseOrder from "../../entities/purchaseOrder.entity";
import ProductCart from "../../entities/productCart.entity";
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

  if (!user.cart.productCart.length)
    throw new AppError(406, "[4014] Empty cart");

  if (!user.addresses.length)
    throw new AppError(406, "[4015] No registered delivery address");

  const newPurchaseOrder = new PurchaseOrder();
  newPurchaseOrder.user = user;
  newPurchaseOrder.products = user.cart.productCart;
  newPurchaseOrder.shipping = data.shipping;
  newPurchaseOrder.total_price = user.cart.amount + data.shipping;
  newPurchaseOrder.purchase_units = user.cart.total_units;
  newPurchaseOrder.created_at = new Date();

  const purchaseOrderRepository = AppDataSource.getRepository(PurchaseOrder);
  await purchaseOrderRepository.save(newPurchaseOrder);

  user.cart.productCart = [];
  user.cart.amount = 0;
  user.cart.total_units = 0;

  await cartRepository.save(user.cart);

  const productCartRepository = AppDataSource.getRepository(ProductCart);
  await productCartRepository.save(user.cart.productCart);
};

export default createPurchaseOrderService;
