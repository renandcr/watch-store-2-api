import { IAddress, IAddressReturn } from "../../interfaces/address.interface";
import { IAddressRelatedUser } from "../../interfaces/user.interface";
import Address from "../../entities/address.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";

const addressCreateService = async (
  data: IAddress
): Promise<IAddressReturn> => {
  const addressRepository = AppDataSource.getRepository(Address);

  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const user = users.find((user) => user.id === data.id);

  if (!user)
    throw new AppError(
      404,
      "User not found. Address cannot be assigned to a non-existent user"
    );

  const address: IAddressReturn = new Address();
  address.street = data.street;
  address.district = data.district;
  address.city = data.city;
  address.state = data.state.toUpperCase();
  address.zip_code = data.zip_code;
  address.phone = data.phone;
  address.created_at = new Date();
  address.updated_at = new Date();
  address.user = <IAddressRelatedUser>user;

  await addressRepository.save(address);
  delete address.user;

  return address;
};

export default addressCreateService;
