import { IPurchaseOrderCreate } from "../../interfaces/purchaseOrder.interface";
import PurchaseOrder from "../../entities/purchaseOrder.entity";
import Customer from "../../entities/customer.entity";
import Product from "../../entities/product.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import Cart from "../../entities/cart.entity";

const createPurchaseOrderService = async (
  data: IPurchaseOrderCreate
): Promise<void> => {
  const customerRepository = AppDataSource.getRepository(Customer);
  const customers = await customerRepository.find();
  const customer = customers.find(
    (customer) => customer.id === data.customer_id
  );

  if (!customer) throw new AppError(404, "[4004] Customer not found");

  const cartRepository = AppDataSource.getRepository(Cart);

  if (!customer.cart.productCart.length) {
    throw new AppError(406, "[4014] Empty cart");
  } else if (!customer.addresses.length) {
    throw new AppError(406, "[4015] No registered delivery address");
  } else {
    let mainAddress = false;
    for (let current in customer.addresses) {
      if (customer.addresses[current].main) {
        mainAddress = true;
        break;
      }
    }
    if (!mainAddress) {
      throw new AppError(406, "[4023] You must indicate a delivery address");
    }
  }

  for (let current in customer.cart.productCart) {
    if (customer.cart.productCart[current].product.stock_quantity < 1) {
      throw new AppError(400, "[4020] Product sold out in cart");
    } else if (
      customer.cart.productCart[current].product.stock_quantity -
        customer.cart.productCart[current].units <
      0
    ) {
      throw new AppError(
        400,
        `[4024] Insufficient stock. ${customer.cart.productCart[current].product.id} has ${customer.cart.productCart[current].product.stock_quantity} units available for purchase`
      );
    }
  }

  const newPurchaseOrder = new PurchaseOrder();
  newPurchaseOrder.customer = customer;
  newPurchaseOrder.products = customer.cart.productCart;
  newPurchaseOrder.shipping = customer.cart.shipping;
  newPurchaseOrder.total_price = customer.cart.amount + customer.cart.shipping;
  newPurchaseOrder.purchase_units = customer.cart.total_units;
  newPurchaseOrder.created_at = new Date();

  const purchaseOrderRepository = AppDataSource.getRepository(PurchaseOrder);
  await purchaseOrderRepository.save(newPurchaseOrder);

  const productRepository = AppDataSource.getRepository(Product);
  const products = await productRepository.find();
  for (let current in customer.cart.productCart) {
    for (let item in products) {
      if (customer.cart.productCart[current].product.id === products[item].id) {
        products[item].stock_quantity -=
          customer.cart.productCart[current].units;
        await productRepository.save(products[item]);
      }
    }
  }

  customer.cart.productCart = [];
  customer.cart.amount = 0;
  customer.cart.total_units = 0;
  customer.cart.shipping = 0;
  customer.cart.installment = "Em 1x de 0 sem juros";

  await cartRepository.save(customer.cart);
};

export default createPurchaseOrderService;
