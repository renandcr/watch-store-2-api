import verifyUserAuthentication from "../middlewares/verifyUserAuthentication.middleware";
import typeCheckerMiddleware from "../middlewares/typeChecker.middleware";
import UserController from "../controller/user.controller";
import { Router } from "express";

const userRouter = () => {
  const router = Router();
  router.post("/create", typeCheckerMiddleware, UserController.create);
  router.post("/login", typeCheckerMiddleware, UserController.login);
  router.get("/", verifyUserAuthentication, UserController.list);
  router.get("/:id", verifyUserAuthentication, UserController.profile);
  router.patch(
    "/update/:id",
    typeCheckerMiddleware,
    verifyUserAuthentication,
    UserController.update
  );
  router.delete("/delete/:id", verifyUserAuthentication, UserController.delete);

  return router;
};

export default userRouter;
