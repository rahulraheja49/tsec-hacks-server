const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const skills = require("../utils/skills");

const userSchema = new Schema({
  username: {
    type: String,
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  login_method: {
    type: String,
    required: true,
    default: "email",
  },
  bio: {
    type: String,
  },
  pic: {
    type: String,
  },
  resume: {
    type: String,
  },
  skills: [
    {
      value: {
        type: String,
        enum: skills,
      },
    },
  ],
  social: {
    github: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    twitter: {
      type: String,
    },
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
