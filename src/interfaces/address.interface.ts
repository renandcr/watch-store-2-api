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
  user_id: string;
}

export interface IAddressUpdate {
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

export interface IAddressId {
  id: string;
}
