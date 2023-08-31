import { Session, Board } from "../../models/index.js";
import { HttpError, getBackground } from "../../helpers/index.js";
import { controllerWrapper } from "../../decorators/index.js";

const changeDisplay = async (req, res) => {
  const { token, _id: owner } = req.user;
  const { display: newDisplay } = req.body;

  const currentSession = await Session.findOne({ token });
  const oldDisplay = currentSession ? currentSession.display : null;
  if (newDisplay && newDisplay !== oldDisplay) {
    await Session.findOneAndUpdate({ token }, { $set: { newDisplay } });
    const userBoards = await Board.find({ owner });
    userBoards.forEach(async (board) => {
      const { background, _id: boardId } = board;
      const backgroundURL = await getBackground(background, newDisplay);
      await Board.findByIdAndUpdate(boardId, { backgroundURL });
    });
  }

  res.json({ newDisplay });
};

export default controllerWrapper(changeDisplay);
