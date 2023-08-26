import Joi from "joi";
import {
  themeList,
  nameRegExp,
  emailRegExp,
  passwordRegExp,
} from "../constants/index.js";

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
