import { controllerWrapper } from "../../decorators/index.js";
import { HttpError, getBackground } from "../../helpers/index.js";
import { Board, Session } from "../../models/index.js";

const updateBoard = async (req, res) => {
  const { boardId } = req.params;
  const { token } = req.user;
  const { background: newbackground } = req.body;
  const board = await Board.findById(boardId, "background");
  const oldBackground = board.background;
  const session = await Session.findOne({ token }, "display");
  const display = session.display;
  let backgroundURL = "";

  if (newbackground && newbackground !== oldBackground) {
    backgroundURL = await getBackground(newbackground, display);
  }

  const result = await Board.findByIdAndUpdate(
    boardId,
    { ...req.body, backgroundURL },
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404);
  }
  res.json({ result });
};

export default controllerWrapper(updateBoard);
