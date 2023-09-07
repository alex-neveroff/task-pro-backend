import { User, Session, Board } from "../../models/index.js";
import { HttpError, getBackground } from "../../helpers/index.js";
import { controllerWrapper } from "../../decorators/index.js";
import { tokenTime } from "../../constants/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  const { email, password, display } = req.body;
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
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: tokenTime });

  const userBoards = await Board.find({ owner: user._id });
  userBoards.forEach(async (board) => {
    const { background, _id } = board;
    const backgroundURL = await getBackground(background, display);
    await Board.findByIdAndUpdate(_id, { backgroundURL });
  });
  await Session.create({ token, email, display });

  res.json({
    token: token,
    user: {
      name: user.name,
      email: user.email,
      theme: user.theme,
      avatar: user.avatar,
    },
    session: {
      display: display || "desktop",
    },
  });
};

export default controllerWrapper(login);
