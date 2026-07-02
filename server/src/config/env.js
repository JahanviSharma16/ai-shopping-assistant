import dotenv from "dotenv";
import { validateEnvironment } from "../validators/env.validator.js";

dotenv.config();

validateEnvironment(process.env);

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT),
  mongodbUri: process.env.MONGODB_URI,
  groqApiKey: process.env.GROQ_API_KEY,
};

export default env;
