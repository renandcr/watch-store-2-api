import { ICustomerLogin } from "../../interfaces/customer.interface";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import Customer from "../../entities/customer.entity";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const customerLoginService = async (data: ICustomerLogin): Promise<string> => {
  if (!data.email)
    throw new AppError(406, "[4001] Check if the name of the keys is correct");

  const customerRepository = AppDataSource.getRepository(Customer);
  const customer = await customerRepository.findOneBy({ email: data.email });

  if (!customer) throw new AppError(401, "[4012] Invalid email or password");

  const checkPassword = bcrypt.compareSync(data.password, customer.password);

  if (!checkPassword)
    throw new AppError(401, "[4012] Invalid email or password");

  const token = jwt.sign(
    { email: data.email, id_token: customer.id },
    <string>process.env.SECRET_KEY,
    {
      expiresIn: "12h",
    }
  );

  return token;
};

export default customerLoginService;
