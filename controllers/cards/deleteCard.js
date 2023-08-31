import { controllerWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { Card } from "../../models/index.js";

const deleteCard = async (req, res) => {
  const { cardId } = req.params;
  const result = await Card.findByIdAndDelete(cardId);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export default controllerWrapper(deleteCard);
