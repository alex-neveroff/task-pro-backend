import { controllerWrapper } from "../decorators/index.js";

const addCard = async (req, res) => {};

const updateCard = async (req, res) => {};

const moveCard = async (req, res) => {};

const deleteCard = async (req, res) => {};

export default {
  addCard: controllerWrapper(addCard),
  updateCard: controllerWrapper(updateCard),
  moveCard: controllerWrapper(moveCard),
  deleteCard: controllerWrapper(deleteCard),
};
