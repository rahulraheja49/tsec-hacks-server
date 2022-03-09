const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const skills = require("../utils/skills");

const discussionSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
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
    question: {
      type: String,
      required: true,
    },
    techStack: {
      type: String,
      required: true,
    },
    upvote: {
      type: Number,
      default: 0,
    },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "answer",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Discussion = mongoose.model("discussion", discussionSchema);

module.exports = Discussion;
