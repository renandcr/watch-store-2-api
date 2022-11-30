import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve("src/uploads"));
  },
  filename: (req, file, callback) => {
    // const time = new Date().getTime();
    // callback(null, `${time}-${file.originalname}`);
    callback(null, file.originalname);
  },
});

export default storage;
