import { controllerWrapper } from "../decorators/index.js";

const addColumn = async (req, res) => {};

const updateColumn = async (req, res) => {};

const moveColumn = async (req, res) => {};

const deleteColumn = async (req, res) => {};

export default {
  addColumn: controllerWrapper(addColumn),
  updateColumn: controllerWrapper(updateColumn),
  moveColumn: controllerWrapper(moveColumn),
  deleteColumn: controllerWrapper(deleteColumn),
};
