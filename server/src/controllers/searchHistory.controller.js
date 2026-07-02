import searchHistoryService from "../services/searchHistory.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const getSearchHistory = async (req, res) => {
  const searchHistory = await searchHistoryService.getSearchHistory(req.user.id);

  return successResponse(
    res,
    "Search history fetched successfully",
    searchHistory,
  );
};
