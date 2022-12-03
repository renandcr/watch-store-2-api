import PurchaseOrder from "../../entities/purchaseOrder.entity";
import { IUserId } from "../../interfaces/user.interface";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";
import Cart from "../../entities/cart.entity";

const createPurchaseOrderService = async ({
  user_id,
}: IUserId): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user = users.find((user) => user.id === user_id);

  if (!user) throw new AppError(404, "User not found");

  const cartRepository = AppDataSource.getRepository(Cart);

  if (!user.cart.products.length) throw new AppError(406, "Empty cart");

  const newPurchaseOrder = new PurchaseOrder();
  newPurchaseOrder.user = user;
  newPurchaseOrder.products = user.cart.products;
  newPurchaseOrder.total_price = user.cart.amount;
  newPurchaseOrder.purchase_units = user.cart.total_units;

  const purchaseOrderRepository = AppDataSource.getRepository(PurchaseOrder);
  await purchaseOrderRepository.save(newPurchaseOrder);

  user.cart.products = [];
  user.cart.amount = 0;
  user.cart.total_units = 0;

  await cartRepository.save(user.cart);
};

export default createPurchaseOrderService;
