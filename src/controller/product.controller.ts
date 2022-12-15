import productCreateService from "../services/productRepository/product.create.service";
import productDeleteService from "../services/productRepository/product.delete.service";
import productUpdateService from "../services/productRepository/product.update.service";
import productListService from "../services/productRepository/product.list.service";
import { IProduct } from "../interfaces/product.interface";
import { Request, Response } from "express";

class ProductController {
  static async create(req: Request, res: Response) {
    const {
      img,
      reference,
      description,
      price,
      stock_quantity,
      category,
      genre,
    }: IProduct = req.body;
    const product = await productCreateService({
      img,
      reference,
      description,
      price,
      stock_quantity,
      category,
      genre,
    });

    return res
      .status(201)
      .json({ message: "Product created successfully", data: product });
  }

  static async list(_: Request, res: Response) {
    const products = await productListService();

    return res.json(products);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
      img,
      reference,
      description,
      price,
      stock_quantity,
      category,
      genre,
    }: IProduct = req.body;
    const product = await productUpdateService({
      img,
      reference,
      description,
      price,
      stock_quantity,
      category,
      genre,
      id,
    });

    return res.json({
      data: product,
      message: "Product updated successfully",
    });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await productDeleteService({ id });

    return res.json({ message: "Product deleted successfully" });
  }
}

export default ProductController;
