import { controllerWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { Card, Column } from "../../models/index.js";
import { Types } from "mongoose";

const moveCard = async (req, res) => {
  const { cardId } = req.params;

  const { column: columnId, index } = req.body;

  const currentCardId = new Types.ObjectId(cardId);

  const currentCard = await Card.findById(cardId);
  if (!currentCard) {
    throw HttpError(404, "Card not found");
  }

  const { column: currentColumnId } = currentCard;
  if (!currentColumnId) {
    throw HttpError(400, "Invalid column ID");
  }

  const currentColumn = await Column.findById(currentColumnId);
  if (!currentColumn) {
    throw HttpError(404, "Current column not found");
  }

  const destinationColumn = await Column.findById(columnId);
  if (!destinationColumn) {
    throw HttpError(404, "Destination column not found");
  }

  const updatedOrderCards = currentColumn.orderCards.filter(
    (orderId) => orderId.toString() !== currentCardId.toString()
  );
  currentColumn.orderCards = updatedOrderCards;
  await currentColumn.save();

  await Column.findByIdAndUpdate(destinationColumn, {
    $push: { orderCards: { $each: [cardId], $position: index } },
  });

  const movedCard = await Card.findOneAndUpdate(
    { _id: cardId },
    {
      column: columnId,
    },
    {
      new: true,
    }
  );

  res.status(200).json(movedCard);
};

export default controllerWrapper(moveCard);
