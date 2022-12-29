import addressCreateService from "../services/addressRepository/address.create.service";
import addressUpdateService from "../services/addressRepository/address.update.service";
import addressDeleteService from "../services/addressRepository/address.delete.service";
import { IAddress } from "../interfaces/address.interface";
import { Request, Response } from "express";

class AddressController {
  static async create(req: Request, res: Response) {
    const {
      street,
      district,
      house_number,
      complement,
      city,
      state,
      zip_code,
      phone,
      main,
    }: IAddress = req.body;
    const { customer_id } = req.params;

    await addressCreateService({
      street,
      district,
      house_number,
      complement,
      city,
      state,
      zip_code,
      phone,
      main,
      customer_id,
    });

    return res.status(201).json({ message: "Successfully registered address" });
  }

  static async update(req: Request, res: Response) {
    const {
      street,
      district,
      house_number,
      complement,
      city,
      state,
      zip_code,
      phone,
      main,
    }: IAddress = req.body;
    const { id } = req.params;

    await addressUpdateService({
      street,
      district,
      house_number,
      complement,
      city,
      state,
      zip_code,
      phone,
      main,
      id,
    });

    return res.json({
      message: "Address updated successfully",
    });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await addressDeleteService({ id });

    return res.json({ message: "Address deleted successfully" });
  }
}

export default AddressController;
