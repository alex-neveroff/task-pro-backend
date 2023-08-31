import { controllerWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { Card } from "../../models/index.js";

const addCard = async (req, res) => {
  const result = await Card.create({ ...req.body });
  res.status(201).json(result);
};

export default controllerWrapper(addCard);
