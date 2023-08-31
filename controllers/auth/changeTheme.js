import { User } from "../../models/index.js";
import { controllerWrapper } from "../../decorators/index.js";

const changeTheme = async (req, res) => {
  const { _id } = req.user;
  const { theme } = req.body;
  await User.findByIdAndUpdate(_id, { theme });
  res.json({ theme });
};

export default controllerWrapper(changeTheme);
