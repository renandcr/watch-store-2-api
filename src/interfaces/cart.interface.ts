export interface ICart {
  user_id: string;
  product_id: string;
}

export interface ICartChangeUnits extends ICart {
  units: number;
}
