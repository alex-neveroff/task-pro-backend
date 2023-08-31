import express from "express";
import { validateBody } from "../decorators/index.js";
import { authenticate, isEmptyBody, isValidId } from "../middlewars/index.js";
import { addColumn, deleteColumn, updateColumn } from "../controllers/index.js";
import { addColumnSchema, updateColumnSchema } from "../schemas/index.js";

const columnsRouter = express.Router();
columnsRouter.use(authenticate);

columnsRouter.post("/", isEmptyBody, validateBody(addColumnSchema), addColumn);
columnsRouter.put(
  "/:columnId",
  isEmptyBody,
  isValidId("columnId"),
  validateBody(updateColumnSchema),
  updateColumn
);

columnsRouter.delete("/:columnId", isValidId("columnId"), deleteColumn);

export default columnsRouter;
