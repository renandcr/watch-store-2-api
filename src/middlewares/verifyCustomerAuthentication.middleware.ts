import { Request, Response, NextFunction } from "express";
import Customer from "../entities/customer.entity";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/appError";
import jwt from "jsonwebtoken";

/*
Administrador tem total liberdade de acesso.
Usuário pode acessar somente seu perfil e endereço.
*/
const verifyCustomerAuthentication = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  let loggedInCustomerId = "";

  if (token) {
    jwt.verify(
      token,
      <string>process.env.SECRET_KEY,
      (errors, encoded: any) => {
        if (errors) throw new AppError(406, "[4017] Invalid token");

        loggedInCustomerId = encoded["id_token"];
      }
    );
  } else {
    throw new AppError(401, "[4000] Request is missing token");
  }

  const customerRepository = AppDataSource.getRepository(Customer);
  const customer = await customerRepository.findOneBy({
    id: loggedInCustomerId,
  });

  if (!customer) throw new AppError(500, "[4016] Internal server error");

  const isAddressRoute = req.originalUrl.replace(/[/]/gi, " ").split(" ");

  if (customer["admin"]) return next();
  else if (isAddressRoute[2] === "product")
    throw new AppError(401, "[4022] You are not authorized for this activity");
  else if (loggedInCustomerId === req.params["customer_id"]) return next();
  else if (isAddressRoute[2] === "address") {
    if (
      isAddressRoute[3] === "create" &&
      loggedInCustomerId !== req.params["customer_id"]
    ) {
      throw new AppError(
        401,
        "[4018] You are not authorized to access or make changes to other accounts"
      );
    } else if (
      isAddressRoute[3] === "update" ||
      isAddressRoute[3] === "delete"
    ) {
      const customerAddress = customer.addresses.find(
        (address) => address.id === req.params["id"]
      );
      if (!customerAddress) {
        throw new AppError(
          401,
          "[4018] You are not authorized to access or make changes to other accounts"
        );
      } else {
        return next();
      }
    }
  } else if (!req.params["customer_id"] && !customer["admin"]) {
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

export default verifyCustomerAuthentication;
