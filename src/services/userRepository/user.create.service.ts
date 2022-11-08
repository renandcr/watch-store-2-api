import { IUserCreate, IUserReturn } from "../../interfaces/user.interface";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import bcrypt from "bcrypt";

const createUserService = async ({
  name,
  last_name,
  email,
  password,
}: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);
  const verifyUser = await userRepository.findOneBy({ email: email });

  if (verifyUser) throw new AppError(409, "Email already exists");

  const user: IUserReturn = new User();
  user.name = name;
  user.last_name = last_name;
  user.email = email;
  user.password = bcrypt.hashSync(password, 8);
  user.created_at = new Date();
  user.updated_at = new Date();

  await userRepository.save(user);
  delete user.password;

  return user;
};

export default createUserService;
