const express = require("express");
import { Request, Response } from "express";
import { requestTime } from "./middleware/requestTime";
import { paramsMethod } from "./middleware/paramsMethod";
import { handError } from "./middleware/errorHandler";
import studentRouter from "./routes/student.routes";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./build/swagger.json";
import redoc from "redoc-express";
import router from "./routes/user.routes";
import userRouter from "./routes/user.routes";

// Create express app
export const app = express();

//middleware
app.use(express.json());
app.use(express.static("build"));

//middleware with time
app.use(requestTime);
// Other middleware (including global error handler)
app.use(paramsMethod);
// serve your swagger.json file
app.get("/docs/swagger.json", (req: Request, res: Response) => {
  res.sendFile("swagger.json", { root: "." });
});

// serve redoc
app.get(
  "/docs",
  redoc({
    title: "API Docs",
    specUrl: "swagger.json",
    redocOptions: {
      theme: {
        colors: {
          primary: {
            main: "#6EC5AB",
          },
        },
        typography: {
          fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
          fontSize: "15px",
          lineHeight: "1.5",
          code: {
            code: "#87E8C7",
            backgroundColor: "#4D4D4E",
          },
        },
        menu: {
          backgroundColor: "#ffffff",
        },
      },
    },
  })
);

//routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/student/", studentRouter);
app.use("/api/user", userRouter)

//global error handler
app.use(handError);

export default app;
