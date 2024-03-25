require("dotenv").config();

import app from "./app";
import mongoose from "mongoose";

//connect to mongodb
mongoose
  .connect(process.env.MONG_URI as string)
  .then(async () => {
    process.env.PORT = "3000";
    await app.listen(process.env.PORT);
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connect to db & listening on port", process.env.PORT);
    });
  })
  .catch((err: any) => {
    console.log(err);
  });
