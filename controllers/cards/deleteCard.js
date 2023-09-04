import { controllerWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { Card, Column } from "../../models/index.js";
import { Types } from "mongoose";

const deleteCard = async (req, res) => {
  const { cardId } = req.params;

  const currentCardId = new Types.ObjectId(cardId);
  const currentCard = await Card.findById(cardId);
  const { column: currentColumnId } = currentCard;
  const currentColumn = await Column.findById(currentColumnId);
  if (!currentColumn) {
    throw HttpError(404, "Current column not found");
  }

  const deletedCard = await Card.findByIdAndDelete(cardId);
  if (!deletedCard) {
    throw HttpError(404, "No card found");
  }
  const updatedOrderCards = currentColumn.orderCards.filter(
    (orderId) => orderId.toString() !== currentCardId.toString()
  );
  currentColumn.orderCards = updatedOrderCards;
  await currentColumn.save();

  res.json(deletedCard);
};

export default controllerWrapper(deleteCard);
