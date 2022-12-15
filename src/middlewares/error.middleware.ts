import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: "error", code: err.statusCode, message: err.message });
  }
  return res.status(500).json({
    status: "error",
    code: 500,
    message: "[4016] Internal server error",
  });
};
