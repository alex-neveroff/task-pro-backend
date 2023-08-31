import express from "express";
import { validateBody } from "../decorators/index.js";
import { authenticate, isValidId } from "../middlewars/index.js";
import {
  addColumn,
  deleteColumn,
  getColumn,
  updateColumn,
} from "../controllers/index.js";
import { addColumnSchema, updateColumnSchema } from "../schemas/index.js";

const columnsRouter = express.Router();
columnsRouter.use(authenticate);

columnsRouter.get("/:columnId", isValidId("columnId"), getColumn);
columnsRouter.post("/", validateBody(addColumnSchema), addColumn);
columnsRouter.put(
  "/:columnId",
  isValidId("columnId"),
  validateBody(updateColumnSchema),
  updateColumn
);
columnsRouter.delete("/:columnId", isValidId("columnId"), deleteColumn);

export default columnsRouter;
