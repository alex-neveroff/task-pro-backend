import { controllerWrapper } from "../../decorators/index.js";
import { HttpError, getBackground } from "../../helpers/index.js";
import { Board, Session } from "../../models/index.js";

const addBoard = async (req, res) => {
  const { _id: owner, token } = req.user;
  const { background } = req.body;
  const session = await Session.findOne({ token }, "display");
  const display = session.display;
  let backgroundURL = "";
  if (background) {
    backgroundURL = await getBackground(background, display);
  }

  const result = await Board.create({ ...req.body, backgroundURL, owner });
  res.status(201).json(result);
};

export default controllerWrapper(addBoard);
