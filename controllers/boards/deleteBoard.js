import { controllerWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { Board, Column, Card } from "../../models/index.js";

const deleteBoard = async (req, res) => {
  const { boardId } = req.params;

  const currentBoard = await Board.findById(boardId);
  if (!currentBoard) {
    throw HttpError(404, "No board found");
  }
  const columns = await Column.find({ board: boardId });
  const ArrColumnIds = columns.map((column) => column._id);
  const deleteCards = await Card.deleteMany({ column: { $in: ArrColumnIds } });
  const deleteColumns = await Column.deleteMany({ board: boardId });
  const deleteCurrentBoard = await Board.findByIdAndDelete(boardId);

  if (!deleteCurrentBoard || !deleteColumns || !deleteCards) {
    throw HttpError(404);
  }
  res.json(deleteCurrentBoard);
};

export default controllerWrapper(deleteBoard);
