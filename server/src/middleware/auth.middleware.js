import AppError from "../utils/appError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { verifyAccessToken } from "../utils/jwt.js";
import userRepository from "../repositories/user.repository.js";

const authenticate = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  const accessToken = authorizationHeader?.startsWith("Bearer ")
    ? authorizationHeader.split(" ")[1]
    : null;

  if (!accessToken) {
    return next(
      new AppError("Access token is required", HTTP_STATUS.UNAUTHORIZED),
    );
  }

  try {
    const decodedToken = verifyAccessToken(accessToken);
    const user = await userRepository.findUserById(decodedToken.sub);

    if (!user) {
      return next(new AppError("User not found", HTTP_STATUS.UNAUTHORIZED));
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    return next();
  } catch (error) {
    return next(
      new AppError("Invalid or expired access token", HTTP_STATUS.UNAUTHORIZED),
    );
  }
};

export default authenticate;
