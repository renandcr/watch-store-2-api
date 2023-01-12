import Product from "../../entities/product.entity";
import { AppDataSource } from "../../data-source";
import { API_URL } from "../../app";

const productListService = async (): Promise<Array<Product>> => {
  const productsRepository = AppDataSource.getRepository(Product);
  const products = await productsRepository.find();

  for (let product in products) {
    products[
      product
    ].img = `${API_URL}/watch_store/product/${products[product].img}`;
  }

  return products;
};

export default productListService;
