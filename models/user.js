import { Schema, model } from "mongoose";
import { handleMongooseError, validateAtUpdate } from "../middlewars/index.js";
import { themeList } from "../constants/index.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
    },
    avatar: {
      type: String,
      default: "",
    },
    theme: {
      type: String,
      enum: themeList,
      default: "light",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", validateAtUpdate);
userSchema.post("findOneAndUpdate", handleMongooseError);
userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

export default User;
