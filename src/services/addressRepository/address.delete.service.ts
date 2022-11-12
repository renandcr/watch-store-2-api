import { IAddressDelete } from "../../interfaces/address.interface";
import Address from "../../entities/address.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

const addressDeleteService = async ({ id }: IAddressDelete): Promise<void> => {
  const addressRepository = AppDataSource.getRepository(Address);
  const addresses = await addressRepository.find();
  const address = addresses.find((address) => address.id === id);

  if (!address) throw new AppError(404, "Address not found");

  await addressRepository.remove(address);
};

export default addressDeleteService;
