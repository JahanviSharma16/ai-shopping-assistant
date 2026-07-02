import { APP_NAME, APP_VERSION } from "../constants/app.js";

const getProjectMetadata = () => ({
  project: APP_NAME,
  version: APP_VERSION,
});

const getHealthStatus = () => ({
  status: "ok",
});

export default {
  getProjectMetadata,
  getHealthStatus,
};
