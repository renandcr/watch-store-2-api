import { IProductUpdate } from "../../interfaces/product.interface";
import Product from "../../entities/product.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

const productUpdateService = async (data: IProductUpdate): Promise<Product> => {
  const productRepository = AppDataSource.getRepository(Product);
  const products = await productRepository.find();
  const product = products.find((product) => product.id === data.id);

  if (!product) throw new AppError(404, "[4007] Product not found");

  for (let current in products) {
    if (products[current].reference === data.reference) {
      throw new AppError(409, "There is already a product with this reference");
    }
  }

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
