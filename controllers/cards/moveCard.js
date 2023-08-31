import { controllerWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { Card } from "../../models/index.js";

const moveCard = async (req, res) => {
  const { cardId } = req.params;
  const { column: columnId } = req.body;
  const result = await Card.findOneAndUpdate(
    { cardId },
    {
      column: columnId,
    },
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

export default controllerWrapper(moveCard);
