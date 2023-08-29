import express from "express";
import { validateBody } from "../decorators/index.js";
import { authenticate, isValidId } from "../middlewars/index.js";
import { columnsController } from "../controllers/index.js";
import { addColumnSchema, updateColumnSchema } from "../schemas/index.js";

const columnsRouter = express.Router();
columnsRouter.use(authenticate);

columnsRouter.get("/:columnId", columnsController.getColumn);
columnsRouter.post(
  "/",
  validateBody(addColumnSchema),
  columnsController.addColumn
);
columnsRouter.put(
  "/:columnId",
  isValidId("columnId"),
  validateBody(updateColumnSchema),
  columnsController.updateColumn
);
columnsRouter.delete(
  "/:columnId",
  isValidId("columnId"),
  columnsController.deleteColumn
);

export default columnsRouter;
