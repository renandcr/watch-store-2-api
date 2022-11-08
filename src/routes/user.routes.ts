import UserController from "../controller/userRepository/user.controller";
import { Router } from "express";

const userRouter = () => {
  const router = Router();
  router.post("/create", UserController.create);
  router.post("/login", UserController.login);
  router.get("/", UserController.list);
  router.get("/:id", UserController.profile);
  router.patch("/update/:id", UserController.update);
  router.delete("/delete/:id", UserController.delete);

  return router;
};

export default userRouter;
