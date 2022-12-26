export interface IProduct {
  img: any;
  reference: string;
  description: string;
  price: number;
  stock_quantity: number;
  category: string;
  genre: string;
}

export interface IProductUpdate extends IProduct {
  id: string;
}

export interface IProductId {
  id: string;
}
