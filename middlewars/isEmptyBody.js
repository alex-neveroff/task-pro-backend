import { HttpError } from "./index.js";

const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    if (req.method === "PATCH") {
      next(HttpError(400, "Missing field favorite"));
    } else {
      next(HttpError(400, "Missing fields"));
    }
  }
  next();
};

export default isEmptyBody;
