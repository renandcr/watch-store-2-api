import { AppError } from "./errors/appError";

export const typeChecker = (data: any) => {
  const emailRegex = /\S+@\S+\.\S+/;

  for (let item in data) {
    if (item === "email" && !emailRegex.test(data[item])) {
      console.log("Aquiiiiiiii 1");
      throw new AppError(401, "Data types are not supported");
    } else if (item !== "admin" && typeof data[item] !== "string") {
      console.log(data);
      console.log(data[item]);
      console.log("Aquiiiiiiii 2");
      throw new AppError(401, "Data types are not supported");
    } else if (item === "admin" && typeof data[item] !== "boolean") {
      console.log("Aquiiiiiiii 3");
      throw new AppError(401, "Data types are not supported");
    }
  }
};
