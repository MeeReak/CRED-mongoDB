const express = require("express");
require("dotenv").config();
import { requestTime } from "./middleware/requestTime";
import { paramsMethod } from "./middleware/paramsMethod";
import { handError } from "./middleware/errorHandler";

const studentRouter = require("./routes/student");
const mongoose = require("mongoose");

// Create express app
export const app = express();

//middleware
app.use(express.json());
//middleware with time
app.use(requestTime);
// Other middleware (including global error handler)
app.use(paramsMethod);

//routes
app.use("/api/student/", studentRouter);

//global error handler
app.use(handError);

//connect to mongodb
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    process.env.PORT = "3000";
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connect to db & listening on port", process.env.PORT);
    });
  })
  .catch((err: any) => {
    console.log(err);
  });
