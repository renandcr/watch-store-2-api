import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/appError";
import User from "../entities/user.entity";
import jwt from "jsonwebtoken";

/*
Administrador tem total liberdade para fazer alterações.
Usuário pode alterar somente seu perfil e endereço.
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
        if (errors) throw new AppError(406, "[4017] Invalid token");

        loggedInUserId = encoded["id_token"];
      }
    );
  } else {
    throw new AppError(401, "[4000] Request is missing token");
  }

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: loggedInUserId,
  });

  if (!user) throw new AppError(500, "[4016] Internal server error");

  const isAddressRoute = req.originalUrl.replace(/[/]/gi, " ").split(" ");

  if (user["admin"]) return next();
  else if (loggedInUserId === req.params["user_id"]) return next();
  else if (isAddressRoute[2] === "address") {
    if (
      isAddressRoute[3] === "create" &&
      loggedInUserId !== req.params["user_id"]
    ) {
      throw new AppError(
        401,
        "[4018] You are not authorized to access or make changes to other accounts"
      );
    } else if (
      isAddressRoute[3] === "update" ||
      isAddressRoute[3] === "delete"
    ) {
      const userAddress = user.addresses.find(
        (address) => address.id === req.params["id"]
      );
      if (!userAddress) {
        throw new AppError(
          401,
          "[4018] You are not authorized to access or make changes to other accounts"
        );
      } else {
        return next();
      }
    }
  } else if (!req.params["user_id"] && !user["admin"]) {
    throw new AppError(
      401,
      "[4018] You are not authorized to access or make changes to other accounts"
    );
  } else {
    throw new AppError(
      401,
      "[4018] You are not authorized to access or make changes to other accounts"
    );
  }
};

export default verifyUserAuthentication;
