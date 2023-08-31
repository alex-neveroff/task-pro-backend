import express from "express";
import { validateBody } from "../decorators/index.js";
import { authenticate, isValidId } from "../middlewars/index.js";
import {
  addCard,
  deleteCard,
  getCard,
  moveCard,
  updateCard,
} from "../controllers/index.js";
import {
  addCardSchema,
  updateCardSchema,
  moveCardSchema,
} from "../schemas/index.js";

const cardsRouter = express.Router();
cardsRouter.use(authenticate);

cardsRouter.get("/:cardId", getCard);
cardsRouter.post("/", validateBody(addCardSchema), addCard);
cardsRouter.put(
  "/:cardId",
  isValidId("cardId"),
  validateBody(updateCardSchema),
  updateCard
);
cardsRouter.patch(
  "/:cardId",
  isValidId("cardId"),
  validateBody(moveCardSchema),
  moveCard
);
cardsRouter.delete("/:cardId", isValidId("cardId"), deleteCard);

export default cardsRouter;
