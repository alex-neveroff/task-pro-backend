import express from "express";
import { validateBody } from "../decorators/index.js";
import { authenticate, isValidId } from "../middlewars/index.js";
import { cardsController } from "../controllers/index.js";
import { addCardSchema, updateCardSchema } from "../schemas/index.js";

// Импортиорвать соответстветствующие схемы и дописать
// их в каждый роутер в "validateBody(схема)";

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
  isValidId,
  validateBody(updateCardSchema),
  cardsController.updateCard
);
cardsRouter.patch(
  "/:cardId/owner/:columnId",
  isValidId,
  cardsController.moveCard
);
cardsRouter.delete("/:cardId", isValidId, cardsController.deleteCard);

export default cardsRouter;
