import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import http from "http";
import createHttpError, { isHttpError } from "http-errors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import scanRoute from "./routes/scanRoutes";
import testRoute from "./routes/testRoutes";
import Logging from "./utils/log";
import mongoose from "mongoose";
import { config } from "./db/conn";

const app = express();

// connect to mongo

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("Mongo connected successfully");
    StartServer();
  });

const StartServer = () => {
  // Log the request
  app.use((req, res, next) => {
    Logging.warning(
      `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );
    res.on("finish", () => {
      if (res.statusCode < 400) {
        Logging.info(
          `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
        );
      } else {
        Logging.error(
          `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}] - MESSAGE: [${res.statusMessage}]`
        );
      }
    });

    next();
  });

  /** Rules of our API */
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });
  // Middleware routes for express
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Auth routes
  app.use("/api", authRoutes);

  // User routes
  app.use("/api", userRoutes);

  // Scan routes
  app.use("/api", scanRoute);

  // Test Routes
  app.use("/api", testRoute);
  // Handle 404 errors
  app.use((req, res, next) => {
    Logging.error("Endpoint not found");
    res.status(404).json({ message: "Endpoint not found" });
    next();
  });

  // Error handler
  app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
      statusCode = error.status;
      errorMessage = error.message;
    }
    Logging.error(errorMessage);
    res.status(statusCode).json({ message: errorMessage });
  });
  http
    .createServer(app)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port`)
    );
};
