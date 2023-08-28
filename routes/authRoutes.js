import express from "express";
import { validateBody } from "../decorators/index.js";
import { isEmptyBody, authenticate, uploadCloud } from "../middlewars/index.js";
import {
  loginSchema,
  registerSchema,
  themeSchema,
  updateUserSchema,
  displaySchema,
} from "../schemas/index.js";
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

authRouter.put(
  "/update",
  authenticate,
  uploadCloud.single("avatar"),
  validateBody(updateUserSchema),
  authController.updateUser
);

authRouter.patch(
  "/theme",
  authenticate,
  validateBody(themeSchema),
  authController.changeTheme
);

authRouter.patch(
  "/display",
  authenticate,
  validateBody(displaySchema),
  authController.changeDisplay
);

authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;
