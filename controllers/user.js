const User = require("../models/User");
const skills = require("../utils/skills");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id, "-password");

    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error", err });
  }
};

const getSkills = async (req, res) => {
  try {
    res.status(200).send(skills);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error", err });
  }
};

const userUpdate = async (req, res) => {
  try {
    if (req.body.skills?.length > 0) {
      let skillsFormat = [];
      req.body.skills?.forEach((skill) => {
        skillsFormat.push({ value: skill });
      });
      req.body.skills = skillsFormat;
    }

    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      returnDocument: "after",
    });
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error", err });
  }
};

module.exports = { getUser, getSkills, userUpdate };
