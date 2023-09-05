import { Schema, model } from "mongoose";
import { handleMongooseError, validateAtUpdate } from "../middlewars/index.js";
import { displayList, sessionTime } from "../constants/index.js";

const sessionSchema = new Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    display: {
      type: String,
      enum: displayList,
      default: "desktop",
    },
  },
  { versionKey: false, timestamps: true }
);
sessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: sessionTime });

sessionSchema.pre("findOneAndUpdate", validateAtUpdate);
sessionSchema.post("findOneAndUpdate", handleMongooseError);
sessionSchema.post("save", handleMongooseError);

const Session = model("session", sessionSchema);

export default Session;
