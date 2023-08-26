import { Schema, model } from "mongoose";
import { handleMongooseError } from "../middlewars/index.js";

const columnSchema = new Schema({}, { versionKey: false, timestamps: true });

columnSchema.post("save", handleMongooseError);

const Column = model("column", columnSchema);

export default Column;
