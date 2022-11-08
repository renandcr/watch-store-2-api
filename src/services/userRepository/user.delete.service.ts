import { IUserProfile } from "../../interfaces/user.interface";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

const userDeleteService = async ({ id }: IUserProfile) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user = users.find((user) => user.id === id);

  if (!user) throw new AppError(401, "User not found");

  await userRepository.remove(user);
};

export default userDeleteService;
