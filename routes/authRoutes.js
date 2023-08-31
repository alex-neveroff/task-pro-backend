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
import {
  changeDisplay,
  changeTheme,
  getCurrent,
  login,
  logout,
  register,
  updateUser,
} from "../controllers/index.js";
const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(registerSchema),
  register
);

authRouter.post("/login", isEmptyBody, validateBody(loginSchema), login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.put(
  "/update",
  isEmptyBody,
  authenticate,
  uploadCloud.single("avatar"),
  validateBody(updateUserSchema),
  updateUser
);

authRouter.patch(
  "/theme",
  isEmptyBody,
  authenticate,
  validateBody(themeSchema),
  changeTheme
);

authRouter.patch(
  "/display",
  isEmptyBody,
  authenticate,
  validateBody(displaySchema),
  changeDisplay
);

authRouter.post("/logout", authenticate, logout);

export default authRouter;
