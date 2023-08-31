import { controllerWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { Board } from "../../models/index.js";

const getAllBoards = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Board.find({ owner }, "-createdAt -updatedAt");
  res.json(result);
};

export default controllerWrapper(getAllBoards);
