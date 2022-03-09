const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const skills = require("../utils/skills");

const userSchema = new Schema(
  {
    username: {
      type: String,
      default: "anonymous",
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
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
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
      devto: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
