import http from "http";
import app from "./app.js";
import env from "./config/env.js";
import { connectDatabase, disconnectDatabase } from "./config/db.js";
import logger from "./utils/logger.js";

const server = http.createServer(app);
let isShuttingDown = false;

const shutdown = async (signal) => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  logger.warn(`${signal} received. Starting graceful shutdown.`);

  server.close(async (serverError) => {
    if (serverError) {
      logger.error("Error while closing HTTP server", {
        error: serverError.message,
      });
      process.exit(1);
    }

    try {
      await disconnectDatabase();
      logger.info("Application shutdown completed");
      process.exit(0);
    } catch (error) {
      logger.error("Application shutdown failed", {
        error: error.message,
        stack: error.stack,
      });
      process.exit(1);
    }
  });
};

const startServer = async () => {
  try {
    await connectDatabase(env.mongodbUri);

    server.listen(env.port, () => {
      logger.success("Server started", {
        port: env.port,
        environment: env.nodeEnv,
      });
    });
  } catch (error) {
    logger.error("Failed to start server", {
      error: error.message,
      stack: error.stack,
    });
    process.exit(1);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startServer();
