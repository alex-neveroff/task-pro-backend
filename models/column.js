import { Schema, model } from "mongoose";
import { handleMongooseError } from "../middlewars/index.js";

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

columnSchema.post("save", handleMongooseError);

const Column = model("column", columnSchema);

export default Column;
