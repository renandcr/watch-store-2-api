import { IProductReturn } from "../../interfaces/product.interface";
import Product from "../../entities/product.entity";
import { AppDataSource } from "../../data-source";

const productListService = async (): Promise<Array<IProductReturn>> => {
  const productsRepository = AppDataSource.getRepository(Product);
  const products = await productsRepository.find();

  for (let item in products) {
    products[
      item
    ].img = `http://localhost:3333/watch_store/product/${products[item].img}`;
  }

  return products;
};

export default productListService;
