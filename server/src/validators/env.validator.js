const REQUIRED_ENV_VARS = ["PORT", "MONGODB_URI", "GROQ_API_KEY"];

export const validateEnvironment = (env) => {
  const missingVariables = REQUIRED_ENV_VARS.filter(
    (variableName) => !env[variableName],
  );

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVariables.join(", ")}`,
    );
  }
};
