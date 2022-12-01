import { IAddress } from "../../interfaces/address.interface";
import Address from "../../entities/address.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";

const addressCreateService = async (data: IAddress): Promise<void> => {
  const addressRepository = AppDataSource.getRepository(Address);
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user = users.find((user) => user.id === data.id);

  if (!user)
    throw new AppError(
      404,
      "User not found. Address cannot be assigned to a non-existent user"
    );

  if (user.addresses.length) {
    user.addresses.map(async (address) => {
      address.main = false;
      await addressRepository.save(address);
    });
  }

  const address = new Address();
  address.street = data.street;
  address.district = data.district;
  address.house_number = data.house_number;
  address.complement = data.complement;
  address.city = data.city;
  address.state = data.state.toUpperCase();
  address.zip_code = data.zip_code;
  address.phone = data.phone;
  address.main = true;
  address.created_at = new Date();
  address.updated_at = new Date();
  address.user = <User>user;

  await addressRepository.save(address);
};

export default addressCreateService;
