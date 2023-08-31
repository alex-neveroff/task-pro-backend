import { controllerWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { Card } from "../../models/index.js";

const updateCard = async (req, res) => {
  const { cardId } = req.params;
  const result = await Card.findByIdAndUpdate(cardId, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

export default controllerWrapper(updateCard);
