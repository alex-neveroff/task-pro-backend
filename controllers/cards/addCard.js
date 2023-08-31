import { controllerWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { Card, Column } from "../../models/index.js";
import { Types } from "mongoose";

const addCard = async (req, res) => {
  const { column: columnId } = req.body;

  if (!Types.ObjectId.isValid(columnId)) {
    throw HttpError(400, "Invalid column ID");
  }
  const currentColumn = await Column.findById(columnId);
  if (!currentColumn) {
    throw HttpError(404, "No column found");
  }

  const newCard = await Card.create({ ...req.body });
  if (!newCard) {
    throw HttpError(400);
  }
  res.status(201).json(newCard);
};

export default controllerWrapper(addCard);
