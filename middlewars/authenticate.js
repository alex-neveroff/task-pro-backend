import { User, Session } from "../models/index.js";
import { HttpError } from "../helpers/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    next(HttpError(401));
  }
  try {
    const session = await Session.findOne({ token });
    if (!session || !session.token || session.token != token) {
      next(HttpError(401));
    }
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      return next(HttpError(401));
    }
    const userWithToken = {
      ...user.toObject(),
      token: session.token,
      display: session.display,
    };
    req.user = userWithToken;
    next();
  } catch {
    next(HttpError(401));
  }
};

export default authenticate;
