import ProductController from "../controller/product.controller";
import { storage } from "../methods/index";
import { Router } from "express";
import multer from "multer";

const productRouter = () => {
  const router = Router();
  const upload = multer({ storage: storage });
  router.post("/create", upload.single("file"), ProductController.create);
  router.get("/list", ProductController.list);
  router.patch("/update/:id", ProductController.update);
  router.delete("/delete/:id", ProductController.delete);

  return router;
};

export default productRouter;
