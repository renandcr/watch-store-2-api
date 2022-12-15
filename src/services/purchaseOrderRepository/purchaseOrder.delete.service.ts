import { IPurchaseOrderDelete } from "../../interfaces/purchaseOrder.interface";
import PurchaseOrder from "../../entities/purchaseOrder.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";

const deletePurchaseOrderService = async ({
  user_id,
  request_id,
}: IPurchaseOrderDelete): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user = users.find((user) => user.id === user_id);

  if (!user) throw new AppError(404, "[4004] User not found");

  const purchaseOrder = user.purchaseOrders.find(
    (request) => request.id === request_id
  );

  if (!purchaseOrder)
    throw new AppError(404, "[4008] Purchase order not found");

  const purchaseOrderRepository = AppDataSource.getRepository(PurchaseOrder);

  await purchaseOrderRepository.remove(purchaseOrder);
};

export default deletePurchaseOrderService;
