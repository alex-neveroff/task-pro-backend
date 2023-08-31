import express from "express";
import { validateBody } from "../decorators/index.js";
import { authenticate, isEmptyBody, isValidId } from "../middlewars/index.js";
import {
  addBoard,
  deleteBoard,
  getAllBoards,
  getOneBoard,
  updateBoard,
} from "../controllers/index.js";
import { addBoardSchema, updateBoardSchema } from "../schemas/index.js";

const boardsRouter = express.Router();
boardsRouter.use(authenticate);

boardsRouter.get("/", getAllBoards);
boardsRouter.get("/:boardId", isValidId("boardId"), getOneBoard);
boardsRouter.post("/", isEmptyBody, validateBody(addBoardSchema), addBoard);
boardsRouter.put(
  "/:boardId",
  isEmptyBody,
  isValidId("boardId"),
  validateBody(updateBoardSchema),
  updateBoard
);
boardsRouter.delete("/:boardId", isValidId("boardId"), deleteBoard);

export default boardsRouter;
