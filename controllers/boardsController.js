import { controllerWrapper } from "../decorators/index.js";
import HttpError from "../middlewars/HttpError.js";
import { Board, Column, Card } from "../models/index.js";
import { Types } from "mongoose";

const getAllBoards = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Board.find({ owner }, "-createdAt -updatedAt");
  res.json(result);
};

const getOneBoard = async (req, res) => {
  const { boardId } = req.params;
  const board = await Board.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(boardId),
      },
    },
    {
      $lookup: {
        from: "columns",
        localField: "_id",
        foreignField: "board",
        as: "columns",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerArr",
      },
    },
    {
      $unwind: {
        path: "$columns",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "cards",
        localField: "columns._id",
        foreignField: "column",
        as: "columns.cards",
      },
    },
    {
      $addFields: {
        owner: { $arrayElemAt: ["$ownerArr", 0] },
        columns: {
          $cond: {
            if: { $eq: ["$columnOrder", []] },
            then: "$REMOVE",
            else: "$columns",
          },
        },
      },
    },
    {
      $project: {
        "owner.token": 0,
        "owner.password": 0,
        "owner._id": 0,
        "owner.theme": 0,
        ownerArr: 0,
      },
    },
    {
      $group: {
        _id: "$_id",
        title: { $first: "$title" },
        icon: { $first: "$icon" },
        background: { $first: "$background" },
        owner: { $first: "$owner" },
        columns: { $push: "$columns" },
      },
    },
  ]);

  if (!board) {
    throw HttpError(404);
  }
  res.json(board[0]);
};

const addBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Board.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateBoard = async (req, res) => {
  console.log(req.params);
  const { boardId } = req.params;
  const result = await Board.findByIdAndUpdate(
    boardId,
    req.body,
    {
      new: true,
    },
    "-createdAt -updatedAt"
  );
  if (!result) {
    throw HttpError(404);
  }
  res.json({ result });
};

const deleteBoard = async (req, res) => {
  const { boardId } = req.params;

  const columns = await Column.find({ owner: boardId });
  const ArrColumnIds = columns.map((column) => column._id);
  const deleteCards = await Card.deleteMany({ owner: { $in: ArrColumnIds } });
  const deleteColumns = await Column.deleteMany({ owner: boardId });
  const deleteCurrentBoard = await Board.findByIdAndDelete(boardId);

  if (!deleteCurrentBoard || !deleteColumns || !deleteCards) {
    throw HttpError(404);
  }
  res.json({
    Board: deleteCurrentBoard,
    Columns: deleteColumns,
    Cards: deleteCards,
  });
};

export default {
  getAllBoards: controllerWrapper(getAllBoards),
  getOneBoard: controllerWrapper(getOneBoard),
  addBoard: controllerWrapper(addBoard),
  updateBoard: controllerWrapper(updateBoard),
  deleteBoard: controllerWrapper(deleteBoard),
};
