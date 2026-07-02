import searchHistoryRepository from "../repositories/searchHistory.repository.js";

const saveSearchHistory = async (userId, query, filters) =>
  searchHistoryRepository.createSearchHistoryEntry({
    user: userId,
    query: query || "",
    filters,
    searchedAt: new Date(),
  });

const getSearchHistory = async (userId) =>
  searchHistoryRepository.findSearchHistoryByUser(userId);

export default {
  saveSearchHistory,
  getSearchHistory,
};
