import { IAddressUpdate } from "../../interfaces/address.interface";
import Address from "../../entities/address.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

const addressUpdateService = async (data: IAddressUpdate): Promise<void> => {
  const addressRepository = AppDataSource.getRepository(Address);
  const customersRepository = await addressRepository.find({
    relations: {
      customer: true,
    },
  });

  const possibleAddress = customersRepository.find(
    (address) => address.id === data.id
  );

  if (!possibleAddress) throw new AppError(404, "[4006] Address not found");

  possibleAddress.customer.addresses.map(async (address) => {
    if (address.id !== data.id) {
      address.main = false;
      await addressRepository.save(address);
    }
  });

  const address = possibleAddress;
  address.street = data.street;
  address.district = data.district;
  address.house_number = data.house_number;
  address.complement = data.complement;
  address.city = data.city;
  address.state = data.state;
  address.zip_code = data.zip_code;
  address.phone = data.phone;
  address.main = true;
  address.created_at = address.created_at;
  address.updated_at = new Date();

  await addressRepository.save(address);
};

export default addressUpdateService;
