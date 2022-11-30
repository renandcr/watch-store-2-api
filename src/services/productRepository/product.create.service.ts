import { IProduct, IProductReturn } from "../../interfaces/product.interface";
import Product from "../../entities/product.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

const productCreateService = async ({
  ...data
}: IProduct): Promise<IProductReturn> => {
  if (!data.reference)
    throw new AppError(406, "Verifique se o nome das chaves está correto");

  const productRepository = AppDataSource.getRepository(Product);
  const possibleProduct: IProductReturn | null =
    await productRepository.findOneBy({
      reference: data.reference,
    });

  if (possibleProduct)
    throw new AppError(409, "Já existe um produto com esta referência");

  const product: IProductReturn = new Product();
  product.img = data.img;
  product.reference = data.reference;
  product.description = data.description;
  product.price = data.price;
  product.stock_quantity = data.stock_quantity;
  product.category = data.category;
  product.genre = data.genre;
  product.created_at = new Date();
  product.updated_at = new Date();

  await productRepository.save(product);

  return product;
};

export default productCreateService;
