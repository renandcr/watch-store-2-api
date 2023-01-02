import { IPurchaseOrderDelete } from "../../interfaces/purchaseOrder.interface";
import PurchaseOrder from "../../entities/purchaseOrder.entity";
import Customer from "../../entities/customer.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

const deletePurchaseOrderService = async ({
  customer_id,
  request_id,
}: IPurchaseOrderDelete): Promise<void> => {
  const customerRepository = AppDataSource.getRepository(Customer);
  const customers = await customerRepository.find();
  const customer = customers.find((customer) => customer.id === customer_id);

  if (!customer) throw new AppError(404, "[4004] Customer not found");

  const purchaseOrder = customer.purchaseOrders.find(
    (request) => request.id === request_id
  );

  if (!purchaseOrder)
    throw new AppError(404, "[4008] Purchase order not found");

  const purchaseOrderRepository = AppDataSource.getRepository(PurchaseOrder);

  await purchaseOrderRepository.remove(purchaseOrder);
};

export default deletePurchaseOrderService;
