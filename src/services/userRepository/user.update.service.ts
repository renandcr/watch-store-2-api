import { IUserReturn, IUserUpdate } from "../../interfaces/user.interface";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";
import bcrypt from "bcrypt";

const userUpdateServices = async ({
  name,
  last_name,
  email,
  admin,
  password,
  id,
}: IUserUpdate) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user: IUserReturn | undefined = users.find((user) => user.id === id);

  if (!user) throw new AppError(404, "User not found");

  user.name = name;
  user.last_name = last_name;
  user.email = email;
  user.admin = admin;
  password
    ? (user.password = bcrypt.hashSync(password, 8))
    : (user.password = user.password);
  user.created_at = user.created_at;
  user.updated_at = new Date();

  await userRepository.save(user);

  delete user.password;

  return user;
};

export default userUpdateServices;
