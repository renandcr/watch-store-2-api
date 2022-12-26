import { IUser, IUserReturn } from "../../interfaces/user.interface";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";
import Cart from "../../entities/cart.entity";
import bcrypt from "bcrypt";

const createUserService = async (data: IUser): Promise<IUserReturn> => {
  if (!data.email)
    throw new AppError(406, "[4001] Check if the name of the keys is correct");
  const userRepository = AppDataSource.getRepository(User);
  const verifyUser = await userRepository.findOneBy({ email: data.email });

  if (verifyUser) throw new AppError(409, "[4009] Email already exists");

  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = new Cart();
  cart.total_units = 0;
  cart.amount = 0;
  cart.installment = "Em 1x de 0 sem juros";
  cart.shipping = 0;

  await cartRepository.save(cart);

  const user: IUserReturn = new User();
  user.name = data.name;
  user.last_name = data.last_name;
  user.email = data.email;
  user.admin = data.admin;
  user.password = bcrypt.hashSync(data.password, 8);
  user.created_at = new Date();
  user.updated_at = new Date();
  user.cart = cart;

  await userRepository.save(user);
  delete user.password;

  return user;
};

export default createUserService;
