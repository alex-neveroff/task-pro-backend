import { controllerWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { Card, Column } from "../../models/index.js";
import { Types } from "mongoose";

const moveCard = async (req, res) => {
  const { cardId } = req.params;
  const { column: columnId } = req.body;

  if (!Types.ObjectId.isValid(columnId)) {
    throw HttpError(400, "Invalid column ID");
  }
  const destinationColumn = await Column.findById(columnId);
  if (!destinationColumn) {
    throw HttpError(404, "Destination column not found");
  }

  const movedCard = await Card.findOneAndUpdate(
    { _id: cardId },
    {
      column: columnId,
    },
    {
      new: true,
    }
  );
  if (!movedCard) {
    throw HttpError(404);
  }
  res.status(200).json(movedCard);
};

export default controllerWrapper(moveCard);
