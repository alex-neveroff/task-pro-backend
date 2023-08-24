import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleMongooseError, validateAtUpdate } from "../middlewars/index.js";

const themeList = ["Dark", "Light", "Violet"];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
    token: String,
    avatar: String,
    theme: {
      type: String,
      enum: themeList,
      default: "Dark",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", validateAtUpdate);
userSchema.post("findOneAndUpdate", handleMongooseError);
userSchema.post("save", handleMongooseError);

export const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Missing required name field",
    "string.base": "Field name must be a string",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Missing required email field",
    "string.base": "Field email must be a string",
    "string.email": "Field email not valid",
  }),
  password: Joi.string().required().messages({
    "any.required": "Missing required password field",
    "string.base": "Field password must be a string",
  }),
  theme: Joi.string().valid(...themeList),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Missing required email field",
    "string.base": "Field email must be a string",
    "string.email": "Field email not valid",
  }),
  password: Joi.string().required().messages({
    "any.required": "Missing required password field",
    "string.base": "Field password must be a string",
  }),
});

export const themeSchema = Joi.object({
  theme: Joi.string()
    .valid(...themeList)
    .required()
    .messages({
      "any.only": "Field theme must be one of {{#valids}}",
    }),
});

export const User = model("user", userSchema);
