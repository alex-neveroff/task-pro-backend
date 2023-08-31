import { controllerWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { Card } from "../../models/index.js";

const deleteCard = async (req, res) => {
  const { cardId } = req.params;
  const deletedCard = await Card.findByIdAndDelete(cardId);
  if (!deletedCard) {
    throw HttpError(404);
  }
  res.json(deletedCard);
};

export default controllerWrapper(deleteCard);
