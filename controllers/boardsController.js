import { Types } from "mongoose";
import { controllerWrapper } from "../decorators/index.js";
import { HttpError, getBackground } from "../middlewars/index.js";
import { Board, Column, Card, Session } from "../models/index.js";

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
        backgroundURL: { $first: "$backgroundURL" },
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
  const { _id: owner, token } = req.user;
  const { background } = req.body;
  const session = await Session.findOne({ token }, "display");
  const display = session.display;
  let backgroundURL = "";
  if (background) {
    backgroundURL = await getBackground(background, display);
  }

  const result = await Board.create({ ...req.body, backgroundURL, owner });
  res.status(201).json(result);
};

const updateBoard = async (req, res) => {
  const { boardId } = req.params;
  const { token } = req.user;
  const { background: newbackground } = req.body;
  const board = await Board.findById(boardId, "background");
  const oldBackground = board.background;
  const session = await Session.findOne({ token }, "display");
  const display = session.display;
  let backgroundURL = "";

  if (newbackground && newbackground !== oldBackground) {
    backgroundURL = await getBackground(newbackground, display);
  }

  const result = await Board.findByIdAndUpdate(
    boardId,
    { ...req.body, backgroundURL },
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404);
  }
  res.json({ result });
};

const deleteBoard = async (req, res) => {
  const { boardId } = req.params;

  const columns = await Column.find({ board: boardId });
  const ArrColumnIds = columns.map((column) => column._id);
  const deleteCards = await Card.deleteMany({ column: { $in: ArrColumnIds } });
  const deleteColumns = await Column.deleteMany({ board: boardId });
  const deleteCurrentBoard = await Board.findByIdAndDelete(boardId);

  if (!deleteCurrentBoard || !deleteColumns || !deleteCards) {
    throw HttpError(404);
  }
  res.json({
    Board: deleteCurrentBoard,
    Columns: columns,
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
