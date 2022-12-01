import userProfileService from "../services/userRepository/user.profile.service";
import userUpdateServices from "../services/userRepository/user.update.service";
import createUserService from "../services/userRepository/user.create.service";
import userDeleteService from "../services/userRepository/user.delete.service";
import UserLoginService from "../services/userRepository/user.login.service";
import userListService from "../services/userRepository/user.list.service";
import { IUserLogin } from "../interfaces/user.interface";
import { IUser } from "../interfaces/user.interface";
import { Request, Response } from "express";

class UserController {
  static async create(req: Request, res: Response) {
    const { name, last_name, email, password, admin }: IUser = req.body;
    const user = await createUserService({
      name,
      last_name,
      email,
      password,
      admin,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", data: user });
  }

  static async login(req: Request, res: Response) {
    const { email, password }: IUserLogin = req.body;
    const token = await UserLoginService({ email, password });

    return res.json({ message: "Login successful", token: token });
  }

  static async list(_: Request, res: Response) {
    const users = await userListService();
    return res.json(users);
  }

  static async profile(req: Request, res: Response) {
    const { id } = req.params;

    const user = await userProfileService({ id });

    return res.json(user);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, last_name, email, password, admin }: IUser = req.body;
    const user = await userUpdateServices({
      name,
      last_name,
      email,
      password,
      admin,
      id,
    });

    return res.json(user);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await userDeleteService({ id });

    return res.json({ message: "Address deleted successfully" });
  }
}

export default UserController;
