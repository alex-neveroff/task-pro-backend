import { controllerWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { Column } from "../../models/index.js";

const addColumn = async (req, res) => {
  const result = await Column.create({ ...req.body });
  res.status(201).json({ result });
};

export default controllerWrapper(addColumn);
