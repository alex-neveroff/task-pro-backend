import { Session } from "../../models/index.js";
import { controllerWrapper } from "../../decorators/index.js";

const logout = async (req, res) => {
  const { token } = req.user;

  await Session.findOneAndDelete({ token });
  res.status(204).end();
};

export default controllerWrapper(logout);
