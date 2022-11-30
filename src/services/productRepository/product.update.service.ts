import Product from "../../entities/product.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

import {
  IProductUpdate,
  IProductReturn,
} from "../../interfaces/product.interface";

const productUpdateService = async ({
  ...data
}: IProductUpdate): Promise<IProductReturn> => {
  const productRepository = AppDataSource.getRepository(Product);
  const products = await productRepository.find();
  const product: IProductReturn | undefined = products.find(
    (product) => product.id === data.id
  );

  if (!product) throw new AppError(404, "Produto não encontrado");

  product.img = data.img;
  product.reference = data.reference;
  product.description = data.description;
  product.price = data.price;
  product.stock_quantity = data.stock_quantity;
  product.category = data.category;
  product.genre = data.genre;
  product.created_at = product.created_at;
  product.updated_at = new Date();

  await productRepository.save(product);

  return product;
};

export default productUpdateService;
