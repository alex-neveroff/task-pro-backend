import { controllerWrapper } from "../decorators/index.js";
import HttpError from "../middlewars/HttpError.js";
import Card from "../models/card.js";
import Column from "../models/column.js";

const getColumn = async (req, res) => {
  const { columnId } = req.params;
  const column = await Column.findById(columnId);
  if (!column) {
    throw HttpError(404);
  }
  const cards = await Card.find({ column: columnId });
  if (!cards) {
    throw HttpError(404);
  }
  res.json({
    column,
    cards,
  });
};

const addColumn = async (req, res) => {
  const result = await Column.create({ ...req.body });
  res.status(201).json({ result });
};

const updateColumn = async (req, res) => {
  const { columnId } = req.params;
  const result = await Column.findByIdAndUpdate(columnId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json({ result });
};

const deleteColumn = async (req, res) => {
  const { columnId } = req.params;

  const deleteCards = await Card.deleteMany({ column: { $in: columnId } });
  const deleteCurrentColumn = await Column.findByIdAndDelete(columnId);
  if (!deleteCurrentColumn || !deleteCards) {
    throw HttpError(404);
  }
  res.json({
    Column: deleteCurrentColumn,
    Cards: deleteCards,
  });
};

export default {
  getColumn: controllerWrapper(getColumn),
  addColumn: controllerWrapper(addColumn),
  updateColumn: controllerWrapper(updateColumn),
  deleteColumn: controllerWrapper(deleteColumn),
};
