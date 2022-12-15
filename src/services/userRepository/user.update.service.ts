import { IUserReturn, IUserUpdate } from "../../interfaces/user.interface";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";
import bcrypt from "bcrypt";

const userUpdateServices = async (data: IUserUpdate): Promise<IUserReturn> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user: IUserReturn | undefined = users.find(
    (user) => user.id === data.user_id
  );

  if (!user) throw new AppError(404, "[4004] User not found");

  user.name = data.name;
  user.last_name = data.last_name;
  user.email = data.email;
  user.admin = data.admin;
  data.password
    ? (user.password = bcrypt.hashSync(data.password, 8))
    : (user.password = user.password);
  user.created_at = user.created_at;
  user.updated_at = new Date();

  await userRepository.save(user);
  delete user.password;

  return user;
};

export default userUpdateServices;
