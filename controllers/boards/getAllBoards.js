import { controllerWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { Board } from "../../models/index.js";

const getAllBoards = async (req, res) => {
  const { _id: owner } = req.user;
  const allUserBoards = await Board.find({ owner }, "-createdAt -updatedAt");
  if (!allUserBoards) {
    throw HttpError(404);
  }

  res.json(allUserBoards);
};

export default controllerWrapper(getAllBoards);
