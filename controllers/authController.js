import { User } from "../models/index.js";
import { HttpError, uploadAvatar } from "../middlewars/index.js";
import { controllerWrapper } from "../decorators/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });
  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    token,
    user: {
      name: newUser.name,
      email: newUser.email,
      theme: newUser.theme,
      avatar: newUser.avatar,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token: token,
    user: {
      name: user.name,
      email: user.email,
      theme: user.theme,
      avatar: user.avatar,
    },
  });
};

const getCurrent = async (req, res) => {
  const { name, email, theme, avatar } = req.user;
  res.json({
    name,
    email,
    theme,
    avatar,
  });
};

const changeTheme = async (req, res) => {
  const { _id, email } = req.user;
  const { theme } = req.body;
  await User.findByIdAndUpdate(_id, { theme });
  res.json({ email, theme });
};

const updateUser = async (req, res) => {
  const { _id, name: oldName, email: oldEmail } = req.user;
  const { name = oldName, email, password } = req.body;

  const updatedUser = {
    name,
  };

  if (req.file) {
    updatedUser.avatar = await uploadAvatar(req, res);
  }

  if (password) {
    updatedUser.password = await bcrypt.hash(password, 10);
  }

  if (email && email !== oldEmail) {
    updatedUser.email = email;
  }

  const result = await User.findByIdAndUpdate(_id, updatedUser, {
    new: true,
    select: "name email theme avatar -_id",
  });
  res.json(result);
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).end();
};

export default {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getCurrent: controllerWrapper(getCurrent),
  changeTheme: controllerWrapper(changeTheme),
  updateUser: controllerWrapper(updateUser),
  logout: controllerWrapper(logout),
};
