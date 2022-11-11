import verifyUserAuthentication from "../middlewares/verifyUserAuthentication.middleware";
import AddressController from "../controller/address.controller";
import { Router } from "express";

const addressRouter = () => {
  const router = Router();
  router.post(
    "/create/:id",
    verifyUserAuthentication,
    AddressController.create
  );
  router.patch(
    "/update/:id",
    verifyUserAuthentication,
    AddressController.update
  );
  router.delete(
    "/delete/:id",
    verifyUserAuthentication,
    AddressController.delete
  );

  return router;
};

export default addressRouter;
