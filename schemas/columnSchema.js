import Joi from "joi";

export const addColumnSchema = Joi.object({
  title: Joi.string().min(3).max(15).required().messages({
    "any required": "Missing required title field",
  }),
  boardId: Joi.string(),
  cards: Joi.array(),
});

export const updateColumnSchema = Joi.object({
  title: Joi.string().min(3).max(15).required().messages({
    "any required": "Missing required title field",
  }),
});
