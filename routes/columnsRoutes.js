import express from "express";
import { validateBody } from "../decorators/index.js";
import { authenticate, isValidId } from "../middlewars/index.js";
import { columnsController } from "../controllers/index.js";
import { addColumnSchema, updateColumnSchema } from "../schemas/index.js";

// Импортиорвать соответстветствующие схемы и дописать их в каждый роутер в "validateBody(схема)";

const columnsRouter = express.Router();
columnsRouter.use(authenticate);

columnsRouter.get("/:columnId", columnsController.getColumn);
columnsRouter.post(
  "/:boardId",
  validateBody(addColumnSchema),
  columnsController.addColumn
);
columnsRouter.put(
  "/:columnId",
  isValidId,
  validateBody(updateColumnSchema),
  columnsController.updateColumn
);
columnsRouter.delete("/:columnId", isValidId, columnsController.deleteColumn);

// columnsRouter.patch(
//   "/:columnId/moving",
//   isValidId,
//   columnsController.moveColumn
// );

export default columnsRouter;
