import Product from "../../entities/product.entity";
import { AppDataSource } from "../../data-source";

const productListService = async (): Promise<Array<Product>> => {
  const productsRepository = AppDataSource.getRepository(Product);
  const products = await productsRepository.find();

  for (let product in products) {
    products[
      product
    ].img = `http://localhost:3333/watch_store/product/${products[product].img}`;
  }

  return products;
};

export default productListService;
