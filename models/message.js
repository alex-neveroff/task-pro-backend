import { Schema, model } from "mongoose";
import { handleMongooseError } from "../middlewars/index.js";

const messageSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

messageSchema.post("save", handleMongooseError);

const Message = model("message", messageSchema);

export default Message;
