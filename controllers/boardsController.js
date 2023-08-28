import { controllerWrapper } from "../decorators/index.js";
import HttpError from "../middlewars/HttpError.js";
import { Board, Column } from "../models/index.js";

const getAllBoards = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Board.find({ owner }, "-createdAt -updatedAt");
  res.json(result);
};

const getOneBoard = async (req, res) => {
  const { boardId } = req.params;
  const board = await Board.findById(boardId);
  const columns = await Column.find({ owner: board._id });

  if (columns.length > 0) {
    const columnsWithCards = await Column.aggregate([
      { $match: { $or: columns } },
      {
        $lookup: {
          from: "cards",
          localField: "_id",
          foreignField: "owner",
          as: "cards",
        },
      },
    ]);
    if (!board) {
      throw HttpError(404);
    }
    res.json({
      board,
      columns: columnsWithCards,
    });
  }
  res.json({
    board,
    columns: [],
  });
};

const addBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Board.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateBoard = async (req, res) => {
  const { boardId } = req.params;
  const result = await Board.findByIdAndUpdate(boardId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json({ result });
};

const deleteBoard = async (req, res) => {
  const { boardId } = req.params;
  const deleteBoard = await Board.findByIdAndDelete(boardId);
  const columns = await Column.findById({ owner: boardId });
  const deleteColumn = await Column.deleteMany({ owner: boardId });
  const ArrColumnIds = columns.map((column) => column._id);
  const deleteCard = await Card.deleteMany({ owner: ArrColumnIds });

  if (!deleteBoard || !deleteColumn || !deleteCard || !columns) {
    throw HttpError(404);
  }
  res.json({ deleteBoard, deleteColumn, deleteCard });
};

export default {
  getAllBoards: controllerWrapper(getAllBoards),
  getOneBoard: controllerWrapper(getOneBoard),
  addBoard: controllerWrapper(addBoard),
  updateBoard: controllerWrapper(updateBoard),
  deleteBoard: controllerWrapper(deleteBoard),
};
