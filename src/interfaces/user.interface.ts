import { IAddressCreateSave } from "./address.interface";

export interface IUserCreate {
  name: string;
  last_name: string;
  email: string;
  admin: boolean;
  password: string;
}

export interface IAddressRelatedUser extends IUserCreate {
  id: string;
  created_at: Date;
  updated_at: Date;
  addresses: Array<IAddressCreateSave>;
}

export interface IUserUpdate extends IUserCreate {
  id: string;
}

export interface IUserReturn {
  name: string;
  last_name: string;
  email: string;
  admin: boolean;
  password?: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserProfile {
  id: string;
}

export interface IUserDatabase extends IUserCreate {
  id: string;
  created_at: Date;
  updated_at: Date;
}
