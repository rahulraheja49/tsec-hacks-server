const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discussionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
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
      answerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "answer",
      },
    },
  ],
});

const Discussion = mongoose.model("discussion", discussionSchema);

module.exports = Discussion;
