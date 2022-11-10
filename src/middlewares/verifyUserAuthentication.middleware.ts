import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";
import jwt from "jsonwebtoken";

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
  const user: any = await userRepository.findOneBy({
    id: loggedInUserId,
  });

  if (user["admin"]) next();
  else if (!req.params["id"] && !user["admin"])
    throw new AppError(401, "Unauthorized permission");
  else if (loggedInUserId === req.params["id"]) next();
  else throw new AppError(401, "Unauthorized permission");
};

export default verifyUserAuthentication;
