const jwt = require("jsonwebtoken");
const chalk = require("chalk");

const User = require("../models/User");

exports.userAuth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_BCRYPT);
    console.log(chalk.greenBright(decoded));
    const user = await User.findById(decoded.id);
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ msg: "Authorization failed" });
  }
};
