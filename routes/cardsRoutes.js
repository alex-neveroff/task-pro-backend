import express from "express";
import { authenticate, isValidId } from "../middlewars/index.js";
import { cardsController } from "../controllers/index.js";

// Импортиорвать соответстветствующие схемы и дописать
// их в каждый роутер в "validateBody(схема)";

const cardsRouter = express.Router();

cardsRouter.post("/", authenticate, cardsController.addCard);
cardsRouter.put("/:id", authenticate, isValidId, cardsController.updateCard);
cardsRouter.patch(
  "/:id/moving",
  authenticate,
  isValidId,
  cardsController.moveCard
);
cardsRouter.delete("/:id", authenticate, isValidId, cardsController.deleteCard);

export default cardsRouter;
