import { Schema, model } from "mongoose";
import { handleMongooseError } from "../middlewars/index.js";

const boardSchema = new Schema({}, { versionKey: false, timestamps: true });

boardSchema.post("save", handleMongooseError);

const Board = model("board", boardSchema);

export default Board;
