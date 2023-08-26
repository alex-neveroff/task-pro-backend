import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleMongooseError, validateAtUpdate } from "../middlewars/index.js";

const themeList = ["dark", "light", "violet"];
const emailRegExp = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;
const passwordRegExp = /^[a-zA-Z0-9\-!@#$%^&*()_+,.:;'"?/]+$/;
const nameRegExp = /^[a-zA-Z0-9 !@#$%^&*()_+,.:;'"?/-]+$/;

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

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(32).pattern(nameRegExp).required().messages({
    "any.required": "Missing required name field",
    "string.base": "Field name must be a string",
    "string.min": "Field name must be at least 3 characters long",
    "string.max": "Field name must be no more than 32 characters long",
    "string.pattern.base": "Field name not valid",
  }),
  email: Joi.string().pattern(emailRegExp).required().messages({
    "any.required": "Missing required email field",
    "string.base": "Field email must be a string",
    "string.pattern.base": "Field email not valid",
  }),
  password: Joi.string()
    .min(6)
    .max(32)
    .pattern(passwordRegExp)
    .required()
    .messages({
      "any.required": "Missing required password field",
      "string.base": "Field password must be a string",
      "string.min": "Field name must be at least 6 characters long",
      "string.max": "Field name must be no more than 32 characters long",
      "string.pattern.base": "Field password not valid",
    }),
  theme: Joi.string().valid(...themeList),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required().messages({
    "any.required": "Missing required email field",
    "string.base": "Field email must be a string",
    "string.pattern.base": "Field email not valid",
  }),
  password: Joi.string()
    .min(6)
    .max(32)
    .pattern(passwordRegExp)
    .required()
    .messages({
      "any.required": "Missing required password field",
      "string.base": "Field password must be a string",
      "string.min": "Field name must be at least 6 characters long",
      "string.max": "Field name must be no more than 32 characters long",
      "string.pattern.base": "Field password not valid",
    }),
});

export const themeSchema = Joi.object({
  theme: Joi.string()
    .valid(...themeList)
    .insensitive()
    .required()
    .messages({
      "any.only": "Field theme must be one of {{#valids}}",
    }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(32).pattern(nameRegExp).messages({
    "string.base": "Field name must be a string",
    "string.min": "Field name must be at least 3 characters long",
    "string.max": "Field name must be no more than 32 characters long",
    "string.pattern.base": "Field name not valid",
  }),
  email: Joi.string().pattern(emailRegExp).messages({
    "string.base": "Field email must be a string",
    "string.pattern.base": "Field email not valid",
  }),
  password: Joi.string().min(6).max(32).pattern(passwordRegExp).messages({
    "string.base": "Field password must be a string",
    "string.min": "Field name must be at least 6 characters long",
    "string.max": "Field name must be no more than 32 characters long",
    "string.pattern.base": "Field password not valid",
  }),
  theme: Joi.string().valid(...themeList),
});

export const helpEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required().messages({
    "any.required": "Missing required email field",
    "string.base": "Field email must be a string",
    "string.pattern.base": "Field email not valid",
  }),
  comment: Joi.string().min(6).max(500).required().messages({
    "any.required": "Missing required comment field",
    "string.base": "Comment must be a string",
    "string.min": "Comment must be at least 6 characters long",
    "string.max": "Comment must be no more than 500 characters long",
  }),
});

export const User = model("user", userSchema);
