import { controllerWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { Column, Card } from "../../models/index.js";

const getColumn = async (req, res) => {
  const { columnId } = req.params;
  const column = await Column.findById(columnId);
  if (!column) {
    throw HttpError(404);
  }
  const cards = await Card.find({ column: columnId });
  if (!cards) {
    throw HttpError(404);
  }
  res.json({
    column,
    cards,
  });
};

export default controllerWrapper(getColumn);
