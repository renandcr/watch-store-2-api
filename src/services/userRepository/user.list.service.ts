import { IUserReturn } from "../../interfaces/user.interface";
import { AppDataSource } from "../../data-source";
import User from "../../entities/user.entity";

const userListService = async (): Promise<Array<IUserReturn>> => {
  const userRepository = AppDataSource.getRepository(User);
  const users: Array<IUserReturn> = await userRepository.find();
  for (let user in users) {
    delete users[user].password;
  }

  return users;
};

export default userListService;
