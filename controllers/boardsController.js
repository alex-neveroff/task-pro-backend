import { controllerWrapper } from "../decorators/index.js";

const getAllBoards = async (req, res) => {};

const getOneBoard = async (req, res) => {};

const addBoard = async (req, res) => {};

const updateBoard = async (req, res) => {};

const deleteBoard = async (req, res) => {};

export default {
  getAllBoards: controllerWrapper(getAllBoards),
  getOneBoard: controllerWrapper(getOneBoard),
  addBoard: controllerWrapper(addBoard),
  updateBoard: controllerWrapper(updateBoard),
  deleteBoard: controllerWrapper(deleteBoard),
};
