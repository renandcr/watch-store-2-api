export interface IPurchaseOrderCreate {
  user_id: string;
  shipping: number;
}

export interface IPurchaseOrderDelete {
  user_id: string;
  request_id: string;
}
