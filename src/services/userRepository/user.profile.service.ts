import { IUserProfile, IUserReturn } from "../../interfaces/user.interface";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const userProfileService = async ({ id }: IUserProfile) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user: IUserReturn | undefined = users.find((user) => user.id === id);

  if (!user) throw new AppError(401, "User not found");

  delete user.password;

  return user;
};

export default userProfileService;
