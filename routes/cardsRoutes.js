import express from "express";
import { validateBody } from "../decorators/index.js";
import { authenticate, isValidId } from "../middlewars/index.js";
import { cardsController } from "../controllers/index.js";
import { addCardSchema, updateCardSchema } from "../schemas/index.js";

const cardsRouter = express.Router();
cardsRouter.use(authenticate);

cardsRouter.get("/:cardId", cardsController.getCards);
cardsRouter.post(
  "/:columnId",
  validateBody(addCardSchema),
  cardsController.addCard
);
cardsRouter.put(
  "/:cardId",
  isValidId("cardId"),
  validateBody(updateCardSchema),
  cardsController.updateCard
);
cardsRouter.patch(
  "/:cardId/owner/:columnId",
  isValidId("cardId"),
  cardsController.moveCard
);
cardsRouter.delete("/:cardId", isValidId("cardId"), cardsController.deleteCard);

export default cardsRouter;
