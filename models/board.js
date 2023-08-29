import { Schema, model } from "mongoose";
import { handleMongooseError } from "../middlewars/index.js";
import { backgroundsList, iconsList } from "../constants/lists.js";

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title for the board is required"],
    },
    background: {
      type: String,
      enum: backgroundsList,
      default: "",
    },
    backgroundURL: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      enum: iconsList,
      default: "icon-board-icon-1",
    },
    currentBoard: {
      type: Boolean,
      default: false,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

boardSchema.post("save", handleMongooseError);

const Board = model("board", boardSchema);

export default Board;
