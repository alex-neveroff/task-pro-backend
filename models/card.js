import { Schema, model } from "mongoose";
import { handleMongooseError } from "../middlewars/index.js";
import { priorityList } from "../constants/lists.js";

const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: priorityList,
      default: "without",
    },
    deadline: {
      type: Date,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "column",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

cardSchema.post("save", handleMongooseError);

const Card = model("card", cardSchema);

export default Card;
