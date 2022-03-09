const bcrypt = require("bcrypt");
const chalk = require("chalk");

const User = require("../models/User");
const createJWT = require("../utils/create-jwt");

exports.signup = async (req, res) => {
  try {
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, saltPassword);
    const { email, fullName } = req.body;

    User.findOne({ email, login_method: "email" }).then((currentUser) => {
      if (currentUser) {
        return res.send({
          msg: "User already exists, please log in instead",
          success: false,
        });
      } else {
        new User({
          email,
          fullName,
          password: securePassword,
          login_method: "email",
        })
          .save()
          .then((newUser) => {
            return res.status(200).send({
              data: createJWT(newUser._id),
              success: true,
              name: fullName,
            });
          })
          .catch((error) => {
            console.log(error);
            return res
              .status(400)
              .send({ msg: "Some error required", success: false });
          });
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};

exports.login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({
      email,
      login_method: "email",
    });

    if (!user) {
      return res.send({ status: "error", msg: "Invalid username/password" });
    }

    if (await bcrypt.compare(password, user.password)) {
      return res.send({
        status: "ok",
        data: createJWT(user._id),
        success: true,
      });
    }

    return res.send({
      status: "error",
      msg: "Invalid username/password",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};

exports.googleredirect = (req, res) => {
  console.log(chalk.magentaBright(`Req.User: ${req.user}`));
  res.redirect(`http://localhost:3000?token=${createJWT(req.user._id)}`);
};
