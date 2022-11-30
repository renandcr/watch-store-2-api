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

export interface IProductReturn extends IProductUpdate {
  created_at: Date;
  updated_at: Date;
}

export interface IProductChange {
  id: string;
}
