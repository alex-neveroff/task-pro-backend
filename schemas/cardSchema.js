import Joi from "joi";
import { priorityList } from "../constants/index.js";

export const addCardSchema = Joi.object({
  title: Joi.string().min(3).max(15).required().messages({
    "any required": "Missing required title field",
  }),
  description: Joi.string()
    .required()
    .messages({ "any required": "Missing required description field" }),
  priority: Joi.string().valid(...priorityList),
  deadline: Joi.date().iso(),
  boardId: Joi.string(),
  columnId: Joi.string(),
  cards: Joi.array(),
});

export const updateCardSchema = Joi.object({
  title: Joi.string().min(3).max(15).required().messages({
    "any required": "Missing required title field",
  }),
  description: Joi.string()
    .required()
    .messages({ "any required": "Missing required description field" }),
  priority: Joi.string().valid(...priorityList),
  deadline: Joi.date().iso(),
});
