import { Session, Board } from "../../models/index.js";
import { HttpError, getBackground } from "../../helpers/index.js";
import { controllerWrapper } from "../../decorators/index.js";

const changeDisplay = async (req, res) => {
  const { token, _id: owner, display: oldDisplay } = req.user;
  const { display: newDisplay } = req.body;

  if (newDisplay && newDisplay !== oldDisplay) {
    await Session.findOneAndUpdate(
      { token },
      { $set: { display: newDisplay } }
    );
    const userBoards = await Board.find({ owner });
    if (!userBoards) {
      throw HttpError(404);
    }
    userBoards.forEach(async (board) => {
      const { background, _id: boardId } = board;
      let backgroundURL = "";
      if (background) {
        backgroundURL = await getBackground(background, newDisplay);
      }
      await Board.findByIdAndUpdate(boardId, { backgroundURL });
    });
  }

  res.json({ display: newDisplay });
};

export default controllerWrapper(changeDisplay);
