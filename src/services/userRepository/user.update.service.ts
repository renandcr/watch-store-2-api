import { IUserReturn, IUserUpdate } from "../../interfaces/user.interface";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import bcrypt from "bcrypt";

const userUpdateServices = async ({
  name,
  last_name,
  email,
  password,
  id,
}: IUserUpdate) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user: IUserReturn | undefined = users.find((user) => user.id === id);

  if (!user) throw new AppError(401, "User not found");

  user.name = name || user.name;
  user.last_name = last_name || user.last_name;
  user.email = email || user.email;
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
