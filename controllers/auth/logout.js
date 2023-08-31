import { User, Session } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";
import { controllerWrapper } from "../../decorators/index.js";

const logout = async (req, res) => {
  const { _id, token } = req.user;

  await Session.findOneAndDelete({ token });
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).end();
};

export default controllerWrapper(logout);
