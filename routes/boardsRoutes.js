import express from "express";
import { validateBody } from "../decorators/index.js";
import { authenticate, isValidId } from "../middlewars/index.js";
import { boardsController } from "../controllers/index.js";
import { addBoardSchema, updateBoardSchema } from "../schemas/index.js";

const boardsRouter = express.Router();
boardsRouter.use(authenticate);

boardsRouter.get("/", boardsController.getAllBoards);
boardsRouter.get("/:boardId", isValidId, boardsController.getOneBoard);
boardsRouter.post("/", validateBody(addBoardSchema), boardsController.addBoard);
boardsRouter.put(
  "/:boardId",
  isValidId,
  validateBody(updateBoardSchema),
  boardsController.updateBoard
);
boardsRouter.delete("/:boardId", isValidId, boardsController.deleteBoard);

export default boardsRouter;
