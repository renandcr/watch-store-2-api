import { IUserLogin } from "../../interfaces/user.interface";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserLoginService = async (data: IUserLogin): Promise<string> => {
  if (!data.email)
    throw new AppError(406, "[4001] Check if the name of the keys is correct");

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email: data.email });

  if (!user) throw new AppError(401, "[4012] Invalid email or password");

  const checkPassword = bcrypt.compareSync(data.password, user!.password);

  if (!checkPassword)
    throw new AppError(401, "[4012] Invalid email or password");

  const token = jwt.sign(
    { email: data.email, id_token: user.id },
    <string>process.env.SECRET_KEY,
    {
      expiresIn: "12h",
    }
  );

  return token;
};

export default UserLoginService;
