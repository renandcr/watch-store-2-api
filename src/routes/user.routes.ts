import verifyUserAuthentication from "../middlewares/verifyUserAuthentication.middleware";
import UserController from "../controller/userRepository/user.controller";
import { Router } from "express";

const userRouter = () => {
  const router = Router();
  router.post("/create", UserController.create);
  router.post("/login", UserController.login);
  router.get("/", verifyUserAuthentication, UserController.list);
  router.get("/:id", verifyUserAuthentication, UserController.profile);
  router.patch("/update/:id", verifyUserAuthentication, UserController.update);
  router.delete("/delete/:id", verifyUserAuthentication, UserController.delete);

  return router;
};

export default userRouter;
