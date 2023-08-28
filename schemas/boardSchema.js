import Joi from "joi";
import { iconsList, backgroundsList } from "../constants/index.js";

export const addBoardSchema = Joi.object({
  title: Joi.string().min(3).max(15).required().messages({
    "any required": "Missing required title field",
  }),
  icon: Joi.string().valid(...iconsList),
  background: Joi.string().valid(...backgroundsList),
  backgroundURL: Joi.string(),
});

export const updateBoardSchema = Joi.object({
  title: Joi.string().min(3).max(15).required(),
  icon: Joi.string().valid(...iconsList),
  background: Joi.string().valid(...backgroundsList),
  backgroundURL: Joi.string(),
});
