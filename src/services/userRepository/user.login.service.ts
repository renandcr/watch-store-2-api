import { IUserLogin } from "../../interfaces/user.interface";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserLoginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) throw new AppError(401, "Invalid email or password");

  const checkPassword = bcrypt.compareSync(password, user!.password);

  if (!checkPassword) throw new AppError(401, "Invalid email or password");

  const token = jwt.sign(
    { email: email, id: user!.id },
    <string>process.env.SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );

  return token;
};

export default UserLoginService;
