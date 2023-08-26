import express from "express";
import { validateBody } from "../decorators/index.js";
import { authenticate, isValidId } from "../middlewars/index.js";
import { boardsController } from "../controllers/index.js";
// Импортиорвать соответстветствующие схемы и дописать их в каждый роутер в "validateBody(схема)";

const boardsRouter = express.Router();

boardsRouter.get("/", authenticate, boardsController.getAllBoards);
boardsRouter.get("/:id", authenticate, isValidId, boardsController.getOneBoard);
boardsRouter.post("/", authenticate, boardsController.addBoard);
boardsRouter.put("/:id", authenticate, isValidId, boardsController.updateBoard);
boardsRouter.delete(
  "/:id",
  authenticate,
  isValidId,
  boardsController.deleteBoard
);

export default boardsRouter;
