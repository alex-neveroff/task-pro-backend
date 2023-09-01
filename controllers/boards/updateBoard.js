import { controllerWrapper } from "../../decorators/index.js";
import { HttpError, getBackground } from "../../helpers/index.js";
import { Board, Session } from "../../models/index.js";

const updateBoard = async (req, res) => {
  const { boardId } = req.params;
  const { token } = req.user;
  const { background: newbackground } = req.body;
  const board = await Board.findById(boardId, "background");
  if (!board) {
    throw HttpError(404, "No board found");
  }

  const oldBackground = board.background;
  const currentSession = await Session.findOne({ token }, "display");
  if (!currentSession) {
    throw HttpError(404, "The session has expired. Try to relogin.");
  }

  const display = currentSession.display;
  let backgroundURL = "";

  if (newbackground && newbackground !== oldBackground) {
    backgroundURL = await getBackground(newbackground, display);
  } else backgroundURL = board.backgroundURL;

  const updatedBoard = await Board.findByIdAndUpdate(
    boardId,
    { ...req.body, backgroundURL },
    {
      new: true,
    }
  );
  if (!updatedBoard) {
    throw HttpError(404);
  }
  res.json({ updatedBoard });
};

export default controllerWrapper(updateBoard);
