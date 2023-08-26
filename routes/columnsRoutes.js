import express from "express";
import { authenticate, isValidId } from "../middlewars/index.js";
import { columnsController } from "../controllers/index.js";
// Импортиорвать соответстветствующие схемы и дописать их в каждый роутер в "validateBody(схема)";

const columnsRouter = express.Router();

columnsRouter.post("/", authenticate, columnsController.addColumn);
columnsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  columnsController.updateColumn
);
columnsRouter.patch(
  "/:id/moving",
  authenticate,
  isValidId,
  columnsController.moveColumn
);
columnsRouter.delete(
  "/:id",
  authenticate,
  isValidId,
  columnsController.deleteColumn
);

export default columnsRouter;
