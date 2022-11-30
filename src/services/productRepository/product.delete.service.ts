import Product from "../../entities/product.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

import {
  IProductReturn,
  IProductChange,
} from "../../interfaces/product.interface";

const productDeleteService = async ({ id }: IProductChange): Promise<void> => {
  const productRepository = AppDataSource.getRepository(Product);
  const products = await productRepository.find();
  const product: IProductReturn | undefined = products.find(
    (product) => product.id === id
  );

  if (!product) throw new AppError(404, "Produto não encontrado");

  await productRepository.remove(product);
};

export default productDeleteService;
