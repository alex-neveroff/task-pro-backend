import { controllerWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { Column, Card } from "../../models/index.js";

const deleteColumn = async (req, res) => {
  const { columnId } = req.params;

  const deleteCards = await Card.deleteMany({ column: { $in: columnId } });
  const deleteCurrentColumn = await Column.findByIdAndDelete(columnId);
  if (!deleteCurrentColumn || !deleteCards) {
    throw HttpError(404, "No column found");
  }
  res.json(deleteCurrentColumn);
};

export default controllerWrapper(deleteColumn);
