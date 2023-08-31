import express from "express";
import { validateBody } from "../decorators/index.js";
import { authenticate, isEmptyBody, isValidId } from "../middlewars/index.js";
import {
  addCard,
  deleteCard,
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

cardsRouter.post("/", isEmptyBody, validateBody(addCardSchema), addCard);
cardsRouter.put(
  "/:cardId",
  isEmptyBody,
  isValidId("cardId"),
  validateBody(updateCardSchema),
  updateCard
);
cardsRouter.patch(
  "/:cardId",
  isEmptyBody,
  isValidId("cardId"),
  validateBody(moveCardSchema),
  moveCard
);
cardsRouter.delete("/:cardId", isValidId("cardId"), deleteCard);

export default cardsRouter;
