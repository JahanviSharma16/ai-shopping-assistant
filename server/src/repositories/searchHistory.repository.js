import SearchHistory from "../models/searchHistory.model.js";

const createSearchHistoryEntry = async (payload) => SearchHistory.create(payload);

const findSearchHistoryByUser = async (userId, limit = 10) =>
  SearchHistory.find({ user: userId }).sort({ searchedAt: -1 }).limit(limit);

export default {
  createSearchHistoryEntry,
  findSearchHistoryByUser,
};
