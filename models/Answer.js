const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    discussionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "discussion",
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    upvote: {
      type: Number,
      default: 0,
    },
    accepted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Answer = mongoose.model("answer", answerSchema);

module.exports = Answer;
