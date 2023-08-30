import Joi from "joi";
import {
  themeList,
  nameRegExp,
  emailRegExp,
  passwordRegExp,
  displayList,
} from "../constants/index.js";

export const registerSchema = Joi.object({
  name: Joi.string()
    .allow("")
    .optional()
    .min(2)
    .max(32)
    .pattern(nameRegExp)
    .messages({
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
    .min(8)
    .max(64)
    .pattern(passwordRegExp)
    .required()
    .messages({
      "any.required": "Missing required password field",
      "string.base": "Field password must be a string",
      "string.min": "Field password must be at least 8 characters long",
      "string.max": "Field password must be no more than 64 characters long",
      "string.pattern.base": "Field password not valid",
    }),
  theme: Joi.string()
    .valid(...themeList)
    .messages({
      "string.base": "Field theme must be a string",
      "any.only": "Field theme must be one of {{#valids}}",
    }),
  display: Joi.string()
    .valid(...displayList)
    .messages({
      "string.base": "Field display must be a string",
      "any.only": "Field display must be one of {{#valids}}",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required().messages({
    "any.required": "Missing required email field",
    "string.base": "Field email must be a string",
    "string.pattern.base": "Field email not valid",
  }),
  password: Joi.string()
    .min(8)
    .max(64)
    .pattern(passwordRegExp)
    .required()
    .messages({
      "any.required": "Missing required password field",
      "string.base": "Field password must be a string",
      "string.min": "Field password must be at least 8 characters long",
      "string.max": "Field password must be no more than 64 characters long",
      "string.pattern.base": "Field password not valid",
    }),
  display: Joi.string()
    .valid(...displayList)
    .messages({
      "string.base": "Field display must be a string",
      "any.only": "Field display must be one of {{#valids}}",
    }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string()
    .allow("")
    .optional()
    .min(2)
    .max(32)
    .pattern(nameRegExp)
    .messages({
      "string.base": "Field name must be a string",
      "string.min": "Field name must be at least 3 characters long",
      "string.max": "Field name must be no more than 32 characters long",
      "string.pattern.base": "Field name not valid",
    }),
  email: Joi.string().pattern(emailRegExp).messages({
    "string.base": "Field email must be a string",
    "string.pattern.base": "Field email not valid",
  }),
  password: Joi.string().min(8).max(64).pattern(passwordRegExp).messages({
    "string.base": "Field password must be a string",
    "string.min": "Field password must be at least 8 characters long",
    "string.max": "Field password must be no more than 64 characters long",
    "string.pattern.base": "Field password not valid",
  }),
  theme: Joi.string().valid(...themeList),
});

export const themeSchema = Joi.object({
  theme: Joi.string()
    .valid(...themeList)
    .required()
    .messages({
      "any.required": "Missing required theme field",
      "any.only": "Field theme must be one of {{#valids}}",
    }),
});

export const displaySchema = Joi.object({
  display: Joi.string()
    .valid(...displayList)
    .required()
    .messages({
      "any.required": "Missing required theme display",
      "any.only": "Field display must be one of {{#valids}}",
    }),
});
