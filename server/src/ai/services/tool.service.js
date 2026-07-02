import aiTools from "../tools/index.js";
import AppError from "../../utils/appError.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";

const toolMap = new Map(aiTools.map((tool) => [tool.name, tool]));

const getTool = (name) => {
  const tool = toolMap.get(name);

  if (!tool) {
    throw new AppError("Tool not found", HTTP_STATUS.NOT_FOUND);
  }

  return tool;
};

const getAllTools = () =>
  aiTools.map((tool) => ({
    name: tool.name,
    description: tool.description,
  }));

const executeTool = async ({ name, input }) => {
  const tool = getTool(name);
  const output = await tool.invoke(input);

  return {
    name: tool.name,
    output,
  };
};

export default {
  executeTool,
  getTool,
  getAllTools,
};
