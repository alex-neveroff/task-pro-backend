import Joi from "joi";

export const addColumnSchema = Joi.object({
  title: Joi.string().min(3).max(15).required().messages({
    "any required": "Missing required title field",
    "string.base": "Field title must be a string",
    "string.min": "Field title must be at least 3 characters long",
    "string.max": "Field title must be no more than 15 characters long",
  }),
  board: Joi.string().required().messages({
    "any required": "Missing required board field",
  }),
});

export const updateColumnSchema = Joi.object({
  title: Joi.string().min(3).max(15).required().messages({
    "any required": "Missing required title field",
    "string.base": "Field title must be a string",
    "string.min": "Field title must be at least 3 characters long",
    "string.max": "Field title must be no more than 15 characters long",
  }),
});
