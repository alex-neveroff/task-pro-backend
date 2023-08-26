import { Schema, model } from "mongoose";
import { handleMongooseError } from "../middlewars/index.js";

const cardSchema = new Schema({}, { versionKey: false, timestamps: true });

cardSchema.post("save", handleMongooseError);

const Card = model("card", cardSchema);

export default Card;
