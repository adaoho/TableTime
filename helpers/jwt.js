const { sign, verify } = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const createToken = (payload) => {
  return sign(payload, SECRET);
};

const verifyToken = (payload) => {
  return verify(payload, SECRET);
};

module.exports = {
  createToken,
  verifyToken,
};
