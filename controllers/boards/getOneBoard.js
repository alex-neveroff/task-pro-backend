import { Types } from "mongoose";
import { controllerWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { Board } from "../../models/index.js";

const getOneBoard = async (req, res) => {
  const { boardId } = req.params;
  const currentBoard = await Board.findById(boardId);
  if (!currentBoard) {
    throw HttpError(404, "No board found");
  }

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

export default controllerWrapper(getOneBoard);
