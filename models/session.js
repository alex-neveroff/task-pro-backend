import { Schema, model } from "mongoose";
import { handleMongooseError, validateAtUpdate } from "../middlewars/index.js";
import { displayList } from "../constants/index.js";

const sessionSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    display: {
      type: String,
      enum: displayList,
      default: "desktop",
    },
  },
  { versionKey: false, timestamps: true }
);

sessionSchema.pre("findOneAndUpdate", validateAtUpdate);
sessionSchema.post("findOneAndUpdate", handleMongooseError);
sessionSchema.post("save", handleMongooseError);

const Session = model("session", sessionSchema);

export default Session;
