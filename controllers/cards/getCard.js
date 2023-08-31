import { controllerWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { Card } from "../../models/index.js";

const getCard = async (req, res) => {
  const { cardId } = req.params;
  const result = await Card.findById(cardId);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

export default controllerWrapper(getCard);
