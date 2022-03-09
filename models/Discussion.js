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
      skill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "skill",
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
  invitationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "invitation",
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
