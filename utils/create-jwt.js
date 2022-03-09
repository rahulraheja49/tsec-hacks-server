const jwt = require("jsonwebtoken");

const createJWT = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });
  return token;
};

module.exports = createJWT;
