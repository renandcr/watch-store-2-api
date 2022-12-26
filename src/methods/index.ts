import multer from "multer";
import path from "path";

export const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve("src/uploads"));
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

export const formatPrices = (value: number) => {
  if (value) {
    return value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }
};
