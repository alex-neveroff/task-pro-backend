import Joi from "joi";
import { priorityList } from "../constants/index.js";

export const addCardSchema = Joi.object({
  title: Joi.string().required().messages({
    "any required": "Missing required title field",
    "string.base": "Field title must be a string",
  }),
  description: Joi.string().messages({
    "string.base": "Field description must be a string",
  }),
  priority: Joi.string()
    .valid(...priorityList)
    .messages({
      "string.base": "Field  priority must be a string",
      "any.only": "Field  priority must be one of {{#valids}}",
    }),
  deadline: Joi.date().iso(),
  column: Joi.string().required().messages({
    "any required": "Missing required column field",
  }),
});

export const updateCardSchema = Joi.object({
  title: Joi.string().messages({
    "string.base": "Field title must be a string",
  }),
  description: Joi.string().messages({
    "string.base": "Field  description must be a string",
  }),
  priority: Joi.string()
    .valid(...priorityList)
    .messages({
      "string.base": "Field  priority must be a string",
      "any.only": "Field  priority must be one of {{#valids}}",
    }),
  deadline: Joi.date().iso(),
});

export const moveCardSchema = Joi.object({
  column: Joi.string().required().messages({
    "any required": "Missing required column field",
  }),
});
