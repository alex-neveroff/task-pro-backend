import { HttpError } from "../../helpers/index.js";
import { controllerWrapper } from "../../decorators/index.js";

const getCurrent = async (req, res) => {
  const { name, email, theme, avatar } = req.user;
  res.json({
    name,
    email,
    theme,
    avatar,
  });
};

export default controllerWrapper(getCurrent);
