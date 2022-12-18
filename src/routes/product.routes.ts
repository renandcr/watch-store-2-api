import verifyUserAuthentication from "../middlewares/verifyUserAuthentication.middleware";
import ProductController from "../controller/product.controller";
import { storage } from "../methods/index";
import { Router } from "express";
import multer from "multer";

const productRouter = () => {
  const router = Router();
  const upload = multer({ storage: storage });
  router.post(
    "/create",
    verifyUserAuthentication,
    upload.single("file"),
    ProductController.create
  );
  router.get("/list", ProductController.list);
  router.patch(
    "/update/:id",
    verifyUserAuthentication,
    ProductController.update
  );
  router.delete(
    "/delete/:id",
    verifyUserAuthentication,
    ProductController.delete
  );

  return router;
};

export default productRouter;
