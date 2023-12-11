const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) throw { name: "unauthenticated" };
    const access_token = bearerToken.split(" ")[1];

    const decoded = verifyToken(access_token);
    const user = await User.findByPk(decoded.id);

    if (!user) throw { name: "invalidId" };

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
