import systemRepository from "../repositories/systemRepository.js";

const getProjectInfo = async () => systemRepository.getProjectMetadata();

const getHealth = async () => systemRepository.getHealthStatus();

export default {
  getProjectInfo,
  getHealth,
};
