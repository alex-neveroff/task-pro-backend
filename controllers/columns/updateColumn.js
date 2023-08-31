import { controllerWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { Column, Card } from "../../models/index.js";

const updateColumn = async (req, res) => {
  const { columnId } = req.params;
  const result = await Column.findByIdAndUpdate(columnId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json({ result });
};

export default controllerWrapper(updateColumn);
