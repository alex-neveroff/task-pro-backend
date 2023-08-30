import { Schema, model } from "mongoose";
import { handleMongooseError } from "../middlewars/index.js";
import { priorityList } from "../constants/lists.js";

const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title for the card is required"],
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: priorityList,
      default: "without",
    },
    deadline: {
      type: Date,
    },
    column: {
      type: Schema.Types.ObjectId,
      ref: "column",
      required: [true, "Column assignment for the card is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

cardSchema.post("save", handleMongooseError);

const Card = model("card", cardSchema);

export default Card;
