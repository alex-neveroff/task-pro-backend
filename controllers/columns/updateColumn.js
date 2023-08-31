import { controllerWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { Column, Card } from "../../models/index.js";

const updateColumn = async (req, res) => {
  const { columnId } = req.params;

  const updatedColumn = await Column.findByIdAndUpdate(columnId, req.body, {
    new: true,
  });
  if (!updatedColumn) {
    throw HttpError(404, "No column found");
  }
  res.json(updatedColumn);
};

export default controllerWrapper(updateColumn);
