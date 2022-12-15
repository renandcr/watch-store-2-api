import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const typeCheckerMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { ...data } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;

  for (let item in data) {
    if (item === "email" && !emailRegex.test(data[item])) {
      throw new AppError(401, "[4011] Invalid email");
    } else if (item === "name" || item === "last_name") {
      let stringArray = data[item].toString().split("");

      for (let i = 0; i < stringArray.length; i++) {
        if (!Number.isNaN(parseInt(stringArray[i]))) {
          throw new AppError(
            406,
            "[4010] Numbers are not allowed in the first and last name fields"
          );
        }
      }
    } else if (item === "admin") {
      if (
        typeof data[item] === "string" &&
        data[item].toUpperCase() !== "FALSE" &&
        data[item].toUpperCase() !== "TRUE"
      ) {
        throw new AppError(406, "[4002] Syntax in admin key is incorrect");
      } else if (
        typeof data[item] !== "string" &&
        typeof data[item] !== "boolean"
      ) {
        throw new AppError(
          406,
          "[4003] Value type in admin key must be a boolean"
        );
      } else {
        return next();
      }
    }
  }
  return next();
};

export default typeCheckerMiddleware;
