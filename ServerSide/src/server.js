import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ConnectDb from "./db/Database.Link.js";
import AuthRouter from "../src/routes/Auth.Router.js";
import AppRouter from "../src/routes/App.Router.js";
import AppTrackingRouter from "../src/routes/App.Tracking.js";

import dotenv from "dotenv";
dotenv.config();

ConnectDb();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  try {
    res.json({
      success: true,
      message: "Server running",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      errorReference: "Server_Error",
    });
  }
});

app.use("/api", AuthRouter);
app.use("/api", AppRouter);
app.use("/api", AppTrackingRouter);

app.use((error, req, res, next) => {
  console.error("Global error handler:", error);

  if (req.headersSent) {
    return next(error);
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
    errorReference: "GLOBAL_ERROR",
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === "development" && {
      error: error.message,
      stack: error.stack,
    }),
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    errorReference: "Route_Not_Found",
    path: req.originalUrl,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
