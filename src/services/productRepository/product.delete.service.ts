import { IProductId } from "../../interfaces/product.interface";
import Product from "../../entities/product.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

const productDeleteService = async ({ id }: IProductId): Promise<void> => {
  const productRepository = AppDataSource.getRepository(Product);
  const products = await productRepository.find();
  const product = products.find((product) => product.id === id);

  if (!product) throw new AppError(404, "Product not found");

  await productRepository.remove(product);
};

export default productDeleteService;
