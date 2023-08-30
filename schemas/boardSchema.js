import Joi from "joi";
import { iconsList, backgroundsList } from "../constants/index.js";

export const addBoardSchema = Joi.object({
  title: Joi.string().max(45).required().messages({
    "any required": "Missing required title field",
    "string.base": "Field title must be a string",
    "string.max": "Field title must be no more than 15 characters long",
  }),
  icon: Joi.string()
    .valid(...iconsList)
    .messages({
      "string.base": "Field icon must be a string",
      "any.only": "Field icon must be one of {{#valids}}",
    }),
  background: Joi.string()
    .valid(...backgroundsList)
    .messages({
      "string.base": "Field background must be a string",
      "any.only": "Field background must be one of {{#valids}}",
    }),
  backgroundURL: Joi.string(),
});

export const updateBoardSchema = Joi.object({
  title: Joi.string().max(45).messages({
      "string.base": "Field title must be a string",
    "string.max": "Field title must be no more than 15 characters long",
  }),
  icon: Joi.string()
    .valid(...iconsList)
    .messages({
      "string.base": "Field icon must be a string",
      "any.only": "Field icon must be one of {{#valids}}",
    }),
  background: Joi.string()
    .valid(...backgroundsList)
    .messages({
      "string.base": "Field background must be a string",
      "any.only": "Field background must be one of {{#valids}}",
    }),
  backgroundURL: Joi.string(),
});
