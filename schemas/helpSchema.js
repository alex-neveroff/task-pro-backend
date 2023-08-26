import Joi from "joi";
import { emailRegExp } from "../constants/index.js";

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
