import { controllerWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { Card, Column } from "../../models/index.js";
import { Types } from "mongoose";

const moveCard = async (req, res) => {
  const { cardId } = req.params;

  const {
    currentColumn: currentColumnId,
    destinationColumn: destinationColumnId,
    newIndex,
  } = req.body;

  const currentCardId = new Types.ObjectId(cardId);

  if (!currentColumnId) {
    throw HttpError(400, "Invalid column ID");
  }

  const currentColumn = await Column.findById(currentColumnId);
  if (!currentColumn) {
    throw HttpError(404, "Current column not found");
  }

  const destinationColumn = await Column.findById(destinationColumnId);
  if (!destinationColumn) {
    throw HttpError(404, "Destination column not found");
  }

  const updatedOrderCards = currentColumn.orderCards.filter(
    (orderId) => orderId.toString() !== currentCardId.toString()
  );
  currentColumn.orderCards = updatedOrderCards;
  await currentColumn.save();

  await Column.findByIdAndUpdate(destinationColumn, {
    $push: { orderCards: { $each: [cardId], $position: newIndex } },
  });
  const movedCard = await Card.findOneAndUpdate(
    { _id: cardId },
    {
      column: destinationColumnId,
    },
    {
      new: true,
    }
  );

  res.status(200).json(movedCard);
};

export default controllerWrapper(moveCard);
