import { controllerWrapper } from "../../decorators/index.js";
import { HttpError, getBackground } from "../../helpers/index.js";
import { Board, Session } from "../../models/index.js";

const addBoard = async (req, res) => {
  const { _id: owner, token } = req.user;
  const { background } = req.body;
  const currentSession = await Session.findOne({ token }, "display");
  if (!currentSession) {
    throw HttpError(404, "The session has expired. Try to relogin.");
  }
  const display = currentSession.display;
  let backgroundURL = "";
  if (background) {
    backgroundURL = await getBackground(background, display);
  }
  const newBoard = await Board.create({ ...req.body, backgroundURL, owner });
  if (!newBoard) {
    throw HttpError(400);
  }

  res.status(201).json(newBoard);
};

export default controllerWrapper(addBoard);
