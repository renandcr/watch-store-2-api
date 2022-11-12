import { IUserReturn } from "../../interfaces/user.interface";
import { AppDataSource } from "../../data-source";
import User from "../../entities/user.entity";

const userListService = async (): Promise<IUserReturn[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const users: Array<IUserReturn> = await userRepository.find();
  users.map((user) => delete user.password);

  return users;
};

export default userListService;
