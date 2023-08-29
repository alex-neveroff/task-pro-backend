import { Schema, model } from "mongoose";
import { handleMongooseError } from "../middlewars/index.js";

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title for the column is required"],
    },
    board: {
      type: Schema.Types.ObjectId,
      required: [true, "Board assignment for the column is required"],
      ref: "board",
    },
  },
  { versionKey: false, timestamps: true }
);

columnSchema.post("save", handleMongooseError);

const Column = model("column", columnSchema);

export default Column;
