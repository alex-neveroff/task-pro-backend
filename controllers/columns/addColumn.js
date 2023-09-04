import { controllerWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { Column, Board } from "../../models/index.js";
import { Types } from "mongoose";

const addColumn = async (req, res) => {
  const { board: boardId } = req.body;
  if (!Types.ObjectId.isValid(boardId)) {
    throw HttpError(400, "Invalid board ID");
  }

  const currentBoard = await Board.findById(boardId);
  if (!currentBoard) {
    throw HttpError(404, "No board found");
  }
  const addedColumn = await Column.create({ ...req.body });
  if (!addedColumn) {
    throw HttpError(400);
  }
  res.status(201).json(addedColumn);
};

export default controllerWrapper(addColumn);
