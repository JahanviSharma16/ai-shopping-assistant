import dotenv from "dotenv";
import Product from "../models/product.model.js";
import { connectDatabase, disconnectDatabase } from "../config/db.js";
import { productSeedData } from "../constants/seed-data/products.js";
import logger from "../utils/logger.js";

dotenv.config();

const seedProducts = async () => {
  const { MONGODB_URI: mongodbUri } = process.env;

  if (!mongodbUri) {
    throw new Error("MONGODB_URI is required to seed products");
  }

  await connectDatabase(mongodbUri);

  try {
    await Product.deleteMany({});
    await Product.insertMany(productSeedData);

    logger.success("Products seeded successfully", {
      insertedCount: productSeedData.length,
    });
  } finally {
    await disconnectDatabase();
  }
};

seedProducts()
  .then(() => {
    process.exit(0);
  })
  .catch(async (error) => {
    logger.error("Failed to seed products", {
      error: error.message,
      stack: error.stack,
    });

    try {
      await disconnectDatabase();
    } catch (disconnectError) {
      logger.error("Failed to close database connection after seed error", {
        error: disconnectError.message,
      });
    }

    process.exit(1);
  });
