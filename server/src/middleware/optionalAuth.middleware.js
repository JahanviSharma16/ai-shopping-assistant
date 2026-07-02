import { verifyAccessToken } from "../utils/jwt.js";
import userRepository from "../repositories/user.repository.js";

const optionalAuthenticate = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  const accessToken = authorizationHeader?.startsWith("Bearer ")
    ? authorizationHeader.split(" ")[1]
    : null;

  if (!accessToken) {
    return next();
  }

  try {
    const decodedToken = verifyAccessToken(accessToken);
    const user = await userRepository.findUserById(decodedToken.sub);

    if (user) {
      req.user = {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      };
    }
  } catch (error) {
    req.user = undefined;
  }

  return next();
};

export default optionalAuthenticate;
