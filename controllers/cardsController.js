import { controllerWrapper } from "../decorators/index.js";
import HttpError from "../middlewars/HttpError.js";
import Card from "../models/card.js";

const getCards = async (req, res) => {
  const { cardId } = req.params;
  const result = await Card.findById(cardId);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

const addCard = async (req, res) => {
  const { columnId } = req.params;
  const result = await Card.create({ ...req.body, owner: columnId });
  res.status(201).json(result);
};

const updateCard = async (req, res) => {
  const { cardId } = req.params;
  const result = await Card.findByIdAndUpdate(cardId, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

const moveCard = async (req, res) => {
  const { cardId, columnId } = req.params;
  const result = await Card.findOneAndUpdate(cardId, {
    owner: columnId,
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

const deleteCard = async (req, res) => {
  const { cardId } = req.params;
  const result = await Card.findByIdAndDelete(cardId);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export default {
  getCards: controllerWrapper(getCards),
  addCard: controllerWrapper(addCard),
  updateCard: controllerWrapper(updateCard),
  moveCard: controllerWrapper(moveCard),
  deleteCard: controllerWrapper(deleteCard),
};
