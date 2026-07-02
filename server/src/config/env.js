import dotenv from "dotenv";
import { validateEnvironment } from "../validators/env.validator.js";

dotenv.config();

validateEnvironment(process.env);

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT),
  mongodbUri: process.env.MONGODB_URI,
  groqApiKey: process.env.GROQ_API_KEY,
  modelName: process.env.MODEL_NAME,
  temperature: Number(process.env.TEMPERATURE ?? 0.2),
  maxTokens: Number(process.env.MAX_TOKENS ?? 1024),
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || "15m",
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || "7d",
};

export default env;
