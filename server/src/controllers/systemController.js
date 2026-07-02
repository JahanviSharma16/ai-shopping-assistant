import systemService from "../services/systemService.js";
import { successResponse } from "../utils/apiResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const getRoot = async (req, res) => {
  const projectInfo = await systemService.getProjectInfo();

  return res.status(HTTP_STATUS.OK).json(projectInfo);
};

export const getHealth = async (req, res) => {
  await systemService.getHealth();

  return successResponse(res, "Server is healthy");
};
