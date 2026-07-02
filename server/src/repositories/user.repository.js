import User from "../models/user.model.js";

const createUser = async (payload) => User.create(payload);

const findUserByEmail = async (email, options = {}) => {
  const query = User.findOne({ email });

  if (options.includePassword) {
    query.select("+password");
  }

  if (options.includeRefreshToken) {
    query.select("+refreshToken");
  }

  return query;
};

const findUserById = async (userId, options = {}) => {
  const query = User.findById(userId);

  if (options.includePassword) {
    query.select("+password");
  }

  if (options.includeRefreshToken) {
    query.select("+refreshToken");
  }

  return query;
};

const updateRefreshToken = async (userId, refreshToken) =>
  User.findByIdAndUpdate(
    userId,
    { refreshToken },
    { new: true, runValidators: false },
  );

const clearRefreshToken = async (userId) =>
  User.findByIdAndUpdate(
    userId,
    { refreshToken: null },
    { new: true, runValidators: false },
  );

export default {
  createUser,
  findUserByEmail,
  findUserById,
  updateRefreshToken,
  clearRefreshToken,
};
