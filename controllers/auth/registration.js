import { User, Session } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";
import { controllerWrapper } from "../../decorators/index.js";
import { tokenTime } from "../../constants/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password, display } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });
  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: tokenTime });
  await User.findByIdAndUpdate(newUser._id, { token });
  await Session.create({ token, email, display });

  res.status(201).json({
    token,
    user: {
      name: newUser.name,
      email: newUser.email,
      theme: newUser.theme,
      avatar: newUser.avatar,
    },
    session: {
      display: display || "desktop",
    },
  });
};
export default controllerWrapper(register);
