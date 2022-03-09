const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skills = require("../utils/skills");

const invitationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    pic: {
      type: String,
    },
    requirements: {
      type: String,
    },
    tags: [
      {
        value: {
          type: String,
          enum: skills,
        },
      },
    ],
    about: {
      type: String,
      required: true,
    },
    techStack: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
    },
    upvote: {
      type: Number,
      default: 0,
    },
    requests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "request",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Invitation = mongoose.model("invitation", invitationSchema);

module.exports = Invitation;
