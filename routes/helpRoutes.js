import express from "express";
import { validateBody } from "../decorators/index.js";
import { authenticate } from "../middlewars/index.js";
import { helpEmailSchema } from "../schemas/index.js";
import { helpController } from "../controllers/index.js";
const helpRouter = express.Router();

helpRouter.post(
  "/",
  authenticate,
  validateBody(helpEmailSchema),
  helpController.helpEmail
);

export default helpRouter;
