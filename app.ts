const express = require("express");
import { requestTime } from "./middleware/requestTime";
import { paramsMethod } from "./middleware/paramsMethod";
import { handError } from "./middleware/errorHandler";
import studentRouter from "./routes/student";

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

export default app;