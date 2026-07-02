const formatMessage = (level, message, meta) => {
  const timestamp = new Date().toISOString();
  const serializedMeta = meta ? ` ${JSON.stringify(meta)}` : "";

  return `[${timestamp}] [${level}] ${message}${serializedMeta}`;
};

const logger = {
  info(message, meta) {
    console.info(formatMessage("INFO", message, meta));
  },

  success(message, meta) {
    console.info(formatMessage("SUCCESS", message, meta));
  },

  warn(message, meta) {
    console.warn(formatMessage("WARN", message, meta));
  },

  error(message, meta) {
    console.error(formatMessage("ERROR", message, meta));
  },
};

export default logger;
