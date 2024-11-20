import { app, port } from "./app";
import mongoose from "mongoose";

// connect to the database and only when i've connected start the webserver listening
async function start() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI! + "training");
    console.log("Database is connected!");
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
