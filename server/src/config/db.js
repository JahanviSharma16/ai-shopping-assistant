import mongoose from "mongoose";
import logger from "../utils/logger.js";

let isDisconnecting = false;

export const connectDatabase = async (mongodbUri) => {
  try {
    mongoose.connection.on("connected", () => {
      logger.success("MongoDB connected");
    });

    mongoose.connection.on("error", (error) => {
      logger.error("MongoDB connection error", { error: error.message });
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected");
    });

    await mongoose.connect(mongodbUri);
  } catch (error) {
    logger.error("Failed to connect to MongoDB", {
      error: error.message,
      stack: error.stack,
    });

    throw error;
  }
};

export const disconnectDatabase = async () => {
  if (isDisconnecting || mongoose.connection.readyState === 0) {
    return;
  }

  isDisconnecting = true;

  try {
    await mongoose.connection.close();
    logger.info("MongoDB connection closed gracefully");
  } catch (error) {
    logger.error("Error while closing MongoDB connection", {
      error: error.message,
      stack: error.stack,
    });
    throw error;
  } finally {
    isDisconnecting = false;
  }
};
