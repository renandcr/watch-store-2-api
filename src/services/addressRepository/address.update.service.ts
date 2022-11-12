import { IAddress, IAddressReturn } from "../../interfaces/address.interface";
import Address from "../../entities/address.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

const addressUpdateService = async (
  data: IAddress
): Promise<IAddressReturn> => {
  const addressRepository = AppDataSource.getRepository(Address);
  const addresses = await addressRepository.find();
  const address = addresses.find((address) => address.id === data.id);

  if (!address) throw new AppError(404, "Address not found");

  address.street = data.street;
  address.district = data.district;
  address.city = data.city;
  address.state = data.state;
  address.zip_code = data.zip_code;
  address.phone = data.phone;
  address.created_at = address.created_at;
  address.updated_at = new Date();

  await addressRepository.save(address);

  return address;
};

export default addressUpdateService;
