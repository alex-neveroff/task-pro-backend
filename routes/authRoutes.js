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
const router = express.Router();

router.post(
  "/register",
  isEmptyBody,
  validateBody(registerSchema),
  authController.register
);

router.post(
  "/login",
  isEmptyBody,
  validateBody(loginSchema),
  authController.login
);

router.get("/current", authenticate, authController.getCurrent);

router.patch(
  "/theme",
  authenticate,
  validateBody(themeSchema),
  authController.changeTheme
);

router.put(
  "/update",
  authenticate,
  uploadCloud.single("avatar"),
  validateBody(updateUserSchema),
  authController.updateUser
);

// router.post("/help", authenticate, helpController);

router.post("/logout", authenticate, authController.logout);

export default router;
