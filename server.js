import app from "./app.js";
import mongoose from "mongoose";
const { DB_HOST, PORT = 8000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    process.exit(1);
  });
