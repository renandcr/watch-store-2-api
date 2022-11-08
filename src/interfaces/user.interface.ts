export interface IUserCreate {
  name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface IUserUpdate extends IUserCreate {
  id: string;
}

export interface IUserReturn {
  name: string;
  last_name: string;
  email: string;
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
