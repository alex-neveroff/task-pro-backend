import express from "express";
import { validateBody } from "../decorators/index.js";
import { isEmptyBody, authenticate, uploadCloud } from "../middlewars/index.js";
import {
  loginSchema,
  registerSchema,
  themeSchema,
  updateUserSchema,
} from "../models/user.js";
import { authController } from "../controllers/index.js";
const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(registerSchema),
  authController.register
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(loginSchema),
  authController.login
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.patch(
  "/theme",
  authenticate,
  validateBody(themeSchema),
  authController.changeTheme
);

authRouter.put(
  "/update",
  authenticate,
  uploadCloud.single("avatar"),
  validateBody(updateUserSchema),
  authController.updateUser
);
authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;
