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
    const { id } = req.params;

    const address = await addressCreateService({
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

    return res
      .status(201)
      .json({ address: address, message: "Endereço cadastrado com sucesso" });
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

    const address = await addressUpdateService({
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
      address: address,
      message: "Endereço atualizado com sucesso",
    });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await addressDeleteService({ id });

    return res.status(204).json();
  }
}

export default AddressController;