import { IAddressCreateSave } from "../interfaces/address.interface";
import { IUserDatabase } from "../interfaces/user.interface";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/appError";
import User from "../entities/user.entity";
import jwt from "jsonwebtoken";

/*
Administrador tem total liberdade para fazer alterações.
Usuário pode alterar somente seu perfil e seu endereço.
*/
const verifyUserAuthentication = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  let loggedInUserId = "";

  if (token) {
    jwt.verify(
      token,
      <string>process.env.SECRET_KEY,
      (errors, encoded: any) => {
        if (errors) throw new AppError(406, "Invalid token");

        loggedInUserId = encoded["id_token"];
      }
    );
  } else {
    throw new AppError(401, "Request is missing token");
  }

  const userRepository = AppDataSource.getRepository(User);
  const user: IUserDatabase | any = await userRepository.findOneBy({
    id: loggedInUserId,
  });

  const isAddressRoute = req.originalUrl.replace(/[/]/gi, " ").split(" ");

  if (user["admin"]) return next();
  else if (loggedInUserId === req.params["id"]) return next();
  else if (isAddressRoute[2] === "address") {
    if (isAddressRoute[3] === "create" && loggedInUserId !== req.params["id"]) {
      throw new AppError(401, "Unauthorized permission");
    }

    const addressIsCompatible: IAddressCreateSave | undefined =
      user.addresses.find(
        (address: IAddressCreateSave) => address.id === req.params["id"]
      );

    if (!addressIsCompatible) {
      throw new AppError(401, "Unauthorized permission");
    } else return next();
  } else if (!req.params["id"] && !user["admin"]) {
    throw new AppError(401, "Unauthorized permission");
  } else throw new AppError(401, "Unauthorized permission");
};

export default verifyUserAuthentication;
