import Joi from "joi";

export const addColumnSchema = Joi.object({
  title: Joi.string().max(50).required().messages({
    "any.required": "Missing required title field",
    "string.base": "Field title must be a string",
  }),
  board: Joi.string().required().messages({
    "any.required": "Missing required board field",
  }),
});

export const updateColumnSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Missing required title field",
    "string.base": "Field title must be a string",
  }),
});
