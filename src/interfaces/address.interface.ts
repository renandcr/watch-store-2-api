import { IAddressRelatedUser } from "./user.interface";

export interface IAddress {
  street: string;
  district: string;
  house_number: string;
  complement: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  main: boolean;
  id: string;
}

export interface IAddressCreateSave extends IAddress {
  created_at: Date;
  updated_at: Date;
  user: IAddressRelatedUser;
}

export interface IAddressReturn extends IAddress {
  created_at: Date;
  updated_at: Date;
  user?: IAddressRelatedUser;
}

export interface IAddressDelete {
  id: string;
}
