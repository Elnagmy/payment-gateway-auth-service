import express from "express";
import { AuthController } from "../controllers/AuthController.controllers";
import { AdminMiddelware } from "../Middlewares/AdminVaildatorMW.middelwares";
import { ApiClinetMiddelware } from "../Middlewares/ApiClientVaildatorMW.middelwares";

const controller = new AuthController();
const adminMiddelware = new AdminMiddelware();
const apiClinetMiddelware = new ApiClinetMiddelware();
const AuthRouter: express.IRouter = express.Router();

AuthRouter.post("/api/auth/register", adminMiddelware.validateAdminToken, controller.register);
AuthRouter.post("/api/auth/login", controller.login);
AuthRouter.post("/api/auth", apiClinetMiddelware.validateToken, controller.validateAuth);
export default AuthRouter
