import { IAddress } from "../../interfaces/address.interface";
import Address from "../../entities/address.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

const addressUpdateService = async ({
  street,
  district,
  city,
  state,
  zip_code,
  phone,
  id,
}: IAddress) => {
  const addressRepository = AppDataSource.getRepository(Address);
  const addresses = await addressRepository.find();
  const address = addresses.find((address) => address.id === id);

  if (!address) throw new AppError(404, "Address not found");

  address.street = street;
  address.district = district;
  address.city = city;
  address.state = state;
  address.zip_code = zip_code;
  address.phone = phone;
  address.created_at = address.created_at;
  address.updated_at = new Date();

  await addressRepository.save(address);

  return address;
};

export default addressUpdateService;
