import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

const isValidId = (id) => (req, res, next) => {
  const checkedId = req.params[id];

  if (!isValidObjectId(checkedId)) {
    next(HttpError(400, `${checkedId} is not valid id`));
  }
  next();
};

export default isValidId;
